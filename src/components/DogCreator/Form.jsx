import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments} from "../../actions";
import styles from '../../styles/Form.module.css';
import loadingIcon from '../../img/loading.gif';

const validate = (input) => {
  let errors = {};
  //Breed
  if (!input.breed) errors.breed = "Breed is required";
  else if (/(?=.*[0-9])/.test(input.breed)) errors.breed = "Must be letters only";
  //Height
  if (!input.minHeight) errors.minHeight = "Minimun height is required";
  else if (/(?=[^0-9])/.test(input.minHeight)) errors.minHeight = "Must be numbers only";
  if (!input.maxHeight) errors.maxHeight = "Maximun height is required";
  else if (/(?=[^0-9])/.test(input.maxHeight)) errors.maxHeight = "Must be numbers only";
  //Weight
  if (!input.minWeight) errors.minWeight = "Minimun weight is required";
  else if (/(?=[^0-9])/.test(input.minWeight)) errors.minWeight = "Must be numbers only";
  if (!input.maxWeight) errors.maxWeight = "Maximun weight is required";
  else if (/(?=[^0-9])/.test(input.maxWeight)) errors.maxWeight = "Must be numbers only";
  //Life span
  if (!input.life_span) errors.life_span = "Life span is required";
  else if (/(?=[^0-9])/.test(input.life_span)) errors.life_span = "Must be numbers only";
  return errors;
}

export function CreationForm() {
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    breed: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    life_span: '',
    img: ''
  })
  const [errors, setErrors] = useState({})
  const temperaments = useSelector(state => state.temperaments)
  const [temptsState, setTemptsState] = useState([])
  const loading = useSelector(state => state.loading)

  useEffect(() => {
    dispatch(getTemperaments())
    // eslint-disable-next-line
  }, [])

  // eslint-disable-next-line
  useEffect(() => {
    var tempts = []
    if (temperaments.length) {
      for (let i = 0; i < temperaments.length; i++) {
        tempts.push({id: temperaments[i].id, name: temperaments[i].name, checked: false})
      }
    }
    setTemptsState(tempts)
  }, [temperaments])

  const handleInputsChange = (e) => {
    setInput({...input, [e.target.id]: e.target.value})
    setErrors(validate({...input, [e.target.id]: e.target.value}))
  }

  const handleCheckChange = (e) => {
    var aux = e.target.name
    for (let i = 0; i < temptsState.length; i++) {
      if(temptsState[i].name === aux) {
        if (temptsState[i].checked === false) {
          temptsState[i].checked = true
        }
        else {
          temptsState[i].checked = false
        }
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    var checked = []
    for (let i = 0; i < temptsState.length; i++) {
      if (temptsState[i].checked === true) checked.push(temptsState[i].id)
    }

    var totalHeight = `${input.minHeight} - ${input.maxHeight}`
    var totalWeight = `${input.minWeight} - ${input.maxWeight}`

    var dogToCreate = {
      name: input.breed,
      height: totalHeight,
      weight: totalWeight,
      temperament: checked.join(', '),
      life_span: input.life_span,
      img: input.img
    }

    if (Object.keys(errors).length !== 0) return alert('There are some empty fields!')
    if (!checked.length) return alert('Should choose at least one temperament!')

    // dispatch(createDog(dogToCreate));
    console.log(dogToCreate)

    setInput({
      breed: '',
      minHeight: '',
      maxHeight: '',
      minWeight: '',
      maxWeight: '',
      life_span: '',
      img: ''
    })

    // for (let i = 0; i < temptsState.length; i++) {
    //   if (temptsState[i].checked === true) temptsState[i].checked = false
    // }
    dispatch(getTemperaments())
    return alert('The creation of a dog is not possible in this version 1.0.0')
    // alert('The dog was created successfully!')
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.content} >
        <div className={styles.input} >
          <label>Breed</label>
          <input className={`${styles.breed} ${errors.breed && styles.danger}`} type="text" id="breed" value={input.breed} onChange={handleInputsChange} />
          {errors.breed && (<div className={styles.error} ><p className={styles.p} >{errors.breed}</p></div>)}
        </div>
        <div className={styles.input} >
          <label>Min height</label>
          <input className={`${styles.height} ${errors.minHeight && styles.danger}`} type="text" id="minHeight" value={input.minHeight} onChange={handleInputsChange} />
          <label>Max height</label>
          <input className={`${styles.height} ${errors.maxHeight && styles.danger}`} type="text" id="maxHeight" value={input.maxHeight} onChange={handleInputsChange} />
          {errors.minHeight && (<div className={styles.error} ><p className={styles.p} >{errors.minHeight}</p></div>)}
          {errors.maxHeight && (<div className={styles.error} ><p className={styles.p} >{errors.maxHeight}</p></div>)}
        </div>
        <div className={styles.input} >
          <label>Min weight</label>
          <input className={`${styles.height} ${styles.weight} ${errors.minWeight && styles.danger}`} type="text" id="minWeight" value={input.minWeight} onChange={handleInputsChange} />
          <label>Max weight</label>
          <input className={`${styles.height} ${styles.weight} ${errors.maxWeight && styles.danger}`} type="text" id="maxWeight" value={input.maxWeight} onChange={handleInputsChange} />
          {errors.minWeight && (<div className={styles.error} ><p className={styles.p} >{errors.minWeight}</p></div>)}
          {errors.maxWeight && (<div className={styles.error} ><p className={styles.p} >{errors.maxWeight}</p></div>)}
        </div>
        <div className={styles.input} >
          <label>Life Span</label>
          <input className={`${styles.lifeSpan} ${errors.life_span && styles.danger}`} type="text" id="life_span" value={input.life_span} onChange={handleInputsChange} />
          {errors.life_span && (<div className={styles.error} ><p className={styles.p} >{errors.life_span}</p></div>)}
        </div>
        <div className={styles.input} >
          <label>Picture</label>
          <input className={`${styles.breed} ${styles.img}`} type="url" id='img' placeholder="https://exa.com/img/doggie.jpg" value={input.img} onChange={handleInputsChange} />
        </div>
      </div>
      <div>
        <button className={styles.button} type="submit">Create Dog</button>
      </div>
      <div className={styles.section} >
        {loading && (<img className={styles.loading} src={loadingIcon} alt="" />)}
        {
          !loading && <div className={styles.temptContainer} >
            {
              temperaments.map(ele => (
                <div className={styles.t} key={`Div ${ele.id}`} >
                  <label key={`Label ${ele.id}`} >{ele.name}</label>
                  <input type="checkbox" key={`Checkbox ${ele.id}`} name={ele.name} onChange={handleCheckChange} />
                </div>
              ))
            }
          </div>
        }
      </div>
    </form>
  )
}