"use client";
import { AlertDialog, Button } from "@heroui/react";

export function DeletAlert({ id, userId, item }) {
  console.log("Received ID in delete modal:", id);
  console.log("Received User ID in delete modal:", userId);


  const handleDelete = async () => {
    console.log("Delete confirmed for ID:", id);
    const res = await fetch(`http://localhost:1000/tutors/${userId}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
     
    });
    const fetchData = await res.json();
    console.log("Fetched data for editing:", fetchData);
    // Handle delete logic here, e.g., make an API call to delete the item
  };
  return (
    <AlertDialog>
      <Button variant="danger">Delete Project</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Awesome Project</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={handleDelete}>
                Delete Project
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}