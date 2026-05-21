"use client";
import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation"; 
import { toast } from "react-toastify";

export function DeletAlert({ id, userId, item }) {
  const router = useRouter(); 
  const handleDelete = async () => {
    const { data: tokenData } = await authClient.token()
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/tutors/${userId}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`
        },
      });

      const responseBody = await res.json();
      
      if (res.ok) {
        toast.success("Tutor deleted successfully");
        router.refresh(); 
      } else {
        toast.error(getResponseMessage(responseBody, "Failed to delete tutor."));
        console.error("Failed to delete");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  return (
    <AlertDialog>
      <Button variant="danger">Delete Tutor</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{item?.fullName || "this tutor"}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={handleDelete}>
                Confirm Delete tutor
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
