const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'O Email é obrigatório.'
  }

  if (!values.password) {
    errors.password = 'A senha é obrigatório'
  } else if (!values.password < 6) {
    errors.password = 'A senha deve ter mais de 6 dígitos.'
  }

  return errors
}

export default validate
