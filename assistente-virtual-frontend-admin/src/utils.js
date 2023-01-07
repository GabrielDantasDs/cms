import axios from "axios"

export const formatInputCPFCNPJ = (campoTexto) => {
  if (campoTexto.target.textLength <= 11) {
    campoTexto.target.value = mascaraCpf(campoTexto.target.value)
    return campoTexto
  } else {
    campoTexto.target.value = mascaraCnpj(campoTexto.target.value)
    return campoTexto
  }
}

export const formatInputCEP = (campoTexto) => {
  campoTexto.target.value = mascaraCEP(campoTexto.target.value)

  return campoTexto
}

function retirarFormatacao(campoTexto) {
  campoTexto.value = campoTexto.value.replace(/(\.|\/|\-)/g, '')
}

function mascaraCpf(valor) {
  return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
}

function mascaraCEP(valor) {
  return valor.replace(/(\d{5})(\d{3})/g, '$1-$2')
}

function mascaraCnpj(valor) {
  return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5')
}

export const listUfs = [
  { nome: 'Acre', sigla: 'AC' },
  { nome: 'Alagoas', sigla: 'AL' },
  { nome: 'Amapá', sigla: 'AP' },
  { nome: 'Amazonas', sigla: 'AM' },
  { nome: 'Bahia', sigla: 'BA' },
  { nome: 'Ceará', sigla: 'CE' },
  { nome: 'Distrito Federal', sigla: 'DF' },
  { nome: 'Espírito Santo', sigla: 'ES' },
  { nome: 'Goiás', sigla: 'GO' },
  { nome: 'Maranhão', sigla: 'MA' },
  { nome: 'Mato Grosso', sigla: 'MT' },
  { nome: 'Mato Grosso do Sul', sigla: 'MS' },
  { nome: 'Minas Gerais', sigla: 'MG' },
  { nome: 'Pará', sigla: 'PA' },
  { nome: 'Paraíba', sigla: 'PB' },
  { nome: 'Paraná', sigla: 'PR' },
  { nome: 'Pernambuco', sigla: 'PE' },
  { nome: 'Piauí', sigla: 'PI' },
  { nome: 'Rio de Janeiro', sigla: 'RJ' },
  { nome: 'Rio Grande do Norte', sigla: 'RN' },
  { nome: 'Rio Grande do Sul', sigla: 'RS' },
  { nome: 'Rondônia', sigla: 'RO' },
  { nome: 'Roraima', sigla: 'RR' },
  { nome: 'Santa Catarina', sigla: 'SC' },
  { nome: 'São Paulo', sigla: 'SP' },
  { nome: 'Sergipe', sigla: 'SE' },
  { nome: 'Tocantins', sigla: 'TO' },
]

export const handlerCep = async (cep_field, city_field, district_field, address_field, uf_field, setFieldValue) => {

    if (cep_field.target.textLength > 7) {
        let response = await axios.get(`https://viacep.com.br/ws/${cep_field.target.value}/json`).then((res) => {
            console.log('teste')
            setFieldValue(city_field, res.data.localidade);
            setFieldValue(district_field, res.data.bairro);
            setFieldValue(address_field, res.data.logradouro);
            setFieldValue(uf_field, res.data.uf);
        });
    }
}