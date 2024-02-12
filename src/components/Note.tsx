"use client"

import { Note as NoteModel } from '@prisma/client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader } from './ui/card'
import AddEditNoteDialog from './AddEditNoteDialog'

interface NoteProps {
    note: NoteModel
}

export default function Note({ note }: NoteProps) {
    const [showEditNoteDialog, setShowEditNoteDialog] = useState(false);

    const wasUpdated = note.updatedAt > note.createdAt;

    const createdUpdatedAtTimeStamp = (
        wasUpdated ? note.updatedAt : note.createdAt
    ).toDateString();

    return (
        <>
            <Card onClick={() => setShowEditNoteDialog(true)} className='cursor-pointer hover:bg-[#202020] hover:transition-all duration-300 hover:text-white hover:shadow-lg transition-shadow'>
                <CardHeader className='font-bold text-2xl'>{note.title}</CardHeader>
                <CardDescription className='px-6 pb-2'>
                    {createdUpdatedAtTimeStamp}
                    {wasUpdated && " (Edited)"}
                </CardDescription>
                <CardContent>
                    <p>{note.content}</p>
                </CardContent>
            </Card>
            {
                showEditNoteDialog &&
                <div className='absolute'>
                    <AddEditNoteDialog
                        open={showEditNoteDialog}
                        setOpen={setShowEditNoteDialog}
                        noteToEdit={note}
                    />
                </div>
            }

        </>
    )
}
