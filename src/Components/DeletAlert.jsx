"use client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation"; 
import { toast } from "react-toastify";

export function DeletAlert({ id, userId, item }) {
  const router = useRouter(); 
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:1000/tutors/${userId}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const fetchData = await res.json();
        toast.success("Tutor deleted successfully");
        router.refresh(); 
      } else {
        toast.error("Failed to delete tutor.");
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
                This will permanently delete <strong>{item?.fullName || "this item"}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}