import { Button, ButtonProps } from "./button"

type LoadingButtonProps = {
    loading : boolean
} & ButtonProps

export default function LoadingButton({
    children ,
    loading,
    ...props
} : LoadingButtonProps) {
  return (
    <>  
      <Button className="mt-4" {...props} disabled={props.disabled || loading}>
        {loading && "Working on It"}
        {children}
      </Button>
    </>
  )
}
