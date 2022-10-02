import { REACT_APP_BACKEND_DEV_URL, REACT_APP_BACKEND_PROD_URL,REACT_APP_API_KEY_DEV, REACT_APP_API_KEY_PROD} from '@env'

const devEnvVariables = {
   "BACKEND_URL": REACT_APP_BACKEND_DEV_URL,
   "API_KEY": REACT_APP_API_KEY_DEV
}

const prodEnvVariables = {
    "BACKEND_URL": REACT_APP_BACKEND_PROD_URL,
    "API_KEY": REACT_APP_API_KEY_PROD
}

export default __DEV__? devEnvVariables : prodEnvVariables