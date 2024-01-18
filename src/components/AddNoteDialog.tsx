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


interface AddNoteDialogProps {
    open: boolean,
    setOpen: (open: boolean) => void,
}

export default function AddNoteDialog({ open, setOpen }: AddNoteDialogProps) {
    const router = useRouter();

    const form = useForm<CreateNoteSchema>({
        resolver: zodResolver(createNoteSchema),
        defaultValues:{
            title : "",
            content : "",
        },
    })

    const onSubmit = async(input : CreateNoteSchema) =>{
        try {
            // const response = await fetch("/api/notes",{
            //     method : "POST",
            //     body : JSON.stringify(input),
            // });

            // const response = axios.post("/api/notes" , input);

            // console.log(response)

            // if(!(await response).data) throw Error("Status code" + (await response).status);

            // form.reset();
            // router.refresh();
            // setOpen(false);

        } catch (error) {
            console.log(error);
            alert("Something went wrong")
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Note</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            <FormField
                                control={form.control}
                                name = "title"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Note Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Note Title"  {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name = "content"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Note Content</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Note Content"  {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <LoadingButton type="submit" loading={form.formState.isSubmitting}>
                                    Submit
                                </LoadingButton>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
