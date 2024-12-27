import Background from "./components/Background"
import Form from "./components/Form"
import logo from './assets/images/logo-full.svg'
const App = () => {
  return (
    <div>
      <Background />
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <Form />
    </div>
  )
}

export default App