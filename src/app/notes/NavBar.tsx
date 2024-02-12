"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import logo from "../../../public/NotesAI.png"
import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Cross1Icon, HamburgerMenuIcon, PlusIcon } from '@radix-ui/react-icons'
import AddEditNoteDialog from '@/components/AddEditNoteDialog'
import ThemeToggle from '@/components/ThemeToggle'
import AiChatBotButton from '@/components/AiChatBotButton'

export default function NavBar() {

    const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false);
    const [toggle, setToggle] = useState(false);
    return (
        <>
            <div className='p-4  shadow'>
                <div className='max-w-7xl m-auto flex flex-wrap gap-3 items-center justify-between'>
                    <Link className='flex gap-3 items-center' href={"/notes"}>
                        <Image src={logo} alt='notes ai' width={50} height={50} />
                        <span className='font-bold text-xl'>NotesAI</span>
                    </Link>

                    <div className={toggle ? `flex items-center flex-col gap-4 justify-center absolute top-[3.5rem] right-8  bg-white dark:bg-[#020817] shadow-2xl border p-4 rounded-xl` : `hidden md:flex items-center gap-4`}>
                        <Button className='flex gap-2' onClick={() => setShowAddEditNoteDialog(true)}>
                            <PlusIcon />
                            Add New Note
                        </Button>
                        <AiChatBotButton />
                        <div className='flex justify-evenly w-full gap-4'>

                            <ThemeToggle />
                            <UserButton
                                afterSignOutUrl='/'
                                appearance={{
                                    elements: { avatarBox: { width: "2rem", height: "2rem" } },
                                }}
                            />
                        </div>
                    </div>

                    <div className='block md:hidden'>
                        {!toggle ? <HamburgerMenuIcon onClick={() => setToggle(true)} className='cursor-pointer' />: <Cross1Icon onClick={() => setToggle(false)} className='cursor-pointer'/>}
                        
                    </div>
                </div>

            </div>
            <AddEditNoteDialog open={showAddEditNoteDialog} setOpen={setShowAddEditNoteDialog} />
        </>
    )
}
