import { useForm } from 'react-hook-form'
import ButtonPrimary from '../buttons/ButtonPrimary';


export default function Upload(){
    const { register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Descripcion:</label>
                <input {...register('texto', {required: 'Este campo es obligatorio'})} />
                {errors.texto?.type === 'required' && <span>{errors.texto.message}</span>}
            </div>
            <div>
                <label>Imagen:</label>
                <input type="file" {...register('imagen', {required: 'Debes selecionar una imagen'})} />
                {errors.texto?.type === 'required' && <span>{errors.texto.message}</span>}
            </div>
            <ButtonPrimary text={'Enviar'}/>
        </form>
    )
}