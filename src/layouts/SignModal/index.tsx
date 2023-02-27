import { useState } from 'react'
import { AlertDialogSimple } from '../../components/AlertDialogSimple'
import { SignModalIn } from './In'
import { SignModalOn } from './On'

export type SignModalType = 'signin' | 'signon';
interface SignModalProps {
  open: boolean,
}
export function SignModal({ open }: SignModalProps) {
  const [signType, setSignType] = useState<SignModalType>('signin')

  function handleTransition(type: SignModalType)  {
    setSignType(type)
  }

  return (
    <AlertDialogSimple open={ open } className='px-2 w-auto'>
      { signType == 'signin' ? <SignModalIn handleTransition={ handleTransition } /> : <SignModalOn handleTransition={ handleTransition } />}
    </AlertDialogSimple>
  )
}