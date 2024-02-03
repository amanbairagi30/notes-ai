import Note from '@/components/Note';
import { Card } from '@/components/ui/card';
import prisma from '@/lib/db/prisma';
import { auth } from '@clerk/nextjs'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'NotesAI - Notes',
}

export default async function NotesPage() {

  const { userId } = auth();

  if (!userId) throw Error("UserId undefined");

  const allNotes = await prisma.note.findMany({ where: { userId } })

  return (
    <div className='grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
      {allNotes.length >= 1 ? allNotes.map((item, index) => {
        return (
          <>
            <Note note={item} key={index} />
          </>
        )
      }) 
    :
    <Card className='col-span-full h-[5rem] flex items-center justify-center'>
    Your Note is not here
    </Card>}


      
    </div>
  )
}
