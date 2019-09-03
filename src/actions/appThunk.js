import axios from 'axios'
import { setReactEasyPanZoomLatestVersion } from './appActions'

export const fetchGithubReactEasyPanzoomData = () => {
  return async (dispatch) => {
    const result = await axios.get('https://api.github.com/repos/mnogueron/react-easy-panzoom/releases/latest')
    dispatch(setReactEasyPanZoomLatestVersion(result.data.tag_name))
  }
}
