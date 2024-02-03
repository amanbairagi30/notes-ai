"use client"
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { CreateNoteSchema, createNoteSchema } from "@/lib/validation/note";

import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import LoadingButton from "./ui/loading-button";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import axios from "axios"
import { Note } from "@prisma/client";
import { useState } from "react";


interface AddEditNoteDialogProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    noteToEdit?: Note
}

export default function AddEditNoteDialog({ open, setOpen, noteToEdit }: AddEditNoteDialogProps) {
    const router = useRouter();
    const[isDeleting , setIsDeleting] = useState(false);

    const form = useForm<CreateNoteSchema>({
        resolver: zodResolver(createNoteSchema),
        defaultValues: {
            title: noteToEdit?.title || "",
            content: noteToEdit?.content || "",
        },
    })

    const onSubmit = async (input: CreateNoteSchema) => {
        console.log(input)
        try {
            let response = null;
            if (noteToEdit) {
                response = await fetch("/api/notes", {
                    method: "PUT",
                    body: JSON.stringify({
                        id: noteToEdit.id,
                        ...input,
                    }),
                })
            } else {
                response = await fetch("/api/notes", {
                    method: "POST",
                    body: JSON.stringify(input),
                })
            }

            console.log(response)

            // const response = axios.post("/api/notes" , input);

            // console.log(response)

            if (!response.ok) throw new Error("Couldn't create");

            form.reset();
            router.refresh();
            setOpen(false);

        } catch (error) {
            console.log(error);
            alert("Something went wrong")
        }
    }

    const deleteNote = async () => {
        if (!noteToEdit) return;

        try {

            setIsDeleting(true);
            const response = await fetch("/api/notes", {
                method: "DELETE",
                body: JSON.stringify({
                    id: noteToEdit.id
                }),
            })
            setIsDeleting(false);


            console.log(response)
            if (!response.ok) throw new Error("Couldn't Delete");

            form.reset();
            router.refresh();
            setOpen(false);

        } catch (error) {
            setIsDeleting(false);
            console.log(error);
            alert("Something went wrong")
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{noteToEdit ? "Edit Note" : "Add Note"}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Note Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Note Title"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Note Content</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Note Content"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                {noteToEdit &&
                                    <LoadingButton variant={"destructive"} onClick={deleteNote} type="button" loading={isDeleting} disabled={form.formState.isSubmitting}>
                                        {!isDeleting && "Delete"}
                                    </LoadingButton>
                                }
                                <LoadingButton type="submit" loading={form.formState.isSubmitting}>
                                    {!form.formState.isSubmitting && (noteToEdit ? "Save Changes" : "Create Note")}
                                </LoadingButton>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
