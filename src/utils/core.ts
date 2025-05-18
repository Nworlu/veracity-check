import { toast } from "sonner"

export const _successPrompt = (message: string,duration?:number,description?:string) => {
    toast.success(message,{
        description,
        duration,
        richColors: true,

    })
}
export const _errorPrompt = (message: string,duration?:number,description?:string) => {
    toast.error(message,{
        description,
        duration,
        richColors: true,
    })
}