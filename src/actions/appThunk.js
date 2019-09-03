import axios from 'axios'

export const fetchGithubReactEasyPanzoomData = () => {
  return async (dispatch) => {
    const result = await axios.get('https://api.github.com/repos/mnogueron/react-easy-panzoom/releases/latest')
  }
}
