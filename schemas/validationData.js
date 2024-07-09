import z from 'zod'


const dataSchema = z.object({
    rate: z.number().int().min(0).max(5),
    description:z.string(),
})

export function validationData(object){
    return dataSchema.safeParse(object) 
}

export function updateData(object){
    return dataSchema.partial().safeParse(object)
}
