import Image from 'next/image'
import logo from "../../public/NotesAI.png"
import { Button } from '@/components/ui/button'
import { ArrowTopRightIcon, CursorArrowIcon, EnvelopeOpenIcon, HandIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function Home() {

  const { userId } = auth();

  if (userId) redirect("/notes")

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2">
      <div className='flex gap-4 flex-wrap items-center '>
        <Image src={logo} alt='notes ai' width={80} height={80} />
        <span className='text-4xl font-bold'>NotesAI</span>
      </div>

      <div className='my-6 font-medium text-center'>
        <span>An intelligent AI powered notes taking app </span>
      </div>

      <div>
        <Link href={"/notes"}>
          <Button>
            Try for free <ArrowTopRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </main>
  )
}
