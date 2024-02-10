import React, { useState } from 'react'
import { Button } from './ui/button';
import { LightningBoltIcon, MagicWandIcon } from '@radix-ui/react-icons';
import AiChatBox from './AiChatBox';

export default function AiChatBotButton() {
    const [chatBoxOpen, setChatBoxOpen] = useState(false);
    return (
        <>
            <Button variant={chatBoxOpen ? 'outline' : "default"} className='gap-2' onClick={()=>setChatBoxOpen(!chatBoxOpen)}>
                {chatBoxOpen ? "Close AI" :" Ask AI"} <MagicWandIcon />
            </Button>
            <AiChatBox open={chatBoxOpen} OnClose={() => setChatBoxOpen(false)} />
        </>
    )
}




