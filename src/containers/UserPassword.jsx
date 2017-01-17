import React, { Component } from 'react'
import PasswordForm from '../components/PasswordForm.jsx'
import store from '../store/store'
import { turnOffPasswordEditMode, updateUserProfile } from '../actions/actions'
import { connect } from 'react-redux'

class UserPassword extends Component {

  constructor(props) {
    super(props)
    this.state = {
      passwordError: '',
      passwordValue: '',
      passwordConfirmationValue: ''
    }
  }

  updateUserPassword(event) {
    this.setState({
      passwordValue: event.target.value
    })
  }

  updateUserPasswordConfirmation(event) {
    this.setState({
      passwordConfirmationValue: event.target.value
    })
  }

  validatePasswords() {
    const { passwordValue, passwordConfirmationValue } = this.state
    if(passwordValue !== passwordConfirmationValue) {
      this.setState({
        passwordError: 'Passwords must match'
      })
    } else if(passwordValue.length < 8) {
      this.setState({
        passwordError: 'Password must be 8 characters or more'
      })
    } else {
      this.setState({
        passwordError: ''
      })
    }
  }

  sendPasswords(event) {
    event.preventDefault()
    console.log("validating")
    this.validatePasswords()
    if(this.state.passwordError === '') {
      const updatedInfo = JSON.stringify({
        update: {
          password: this.state.passwordValue,
          password_confirmation: this.state.passwordConfirmationValue
        }
      })
      const updateObj = {
        updatedInfo: updatedInfo,
        id: this.props.user.id
      }
      store.dispatch(updateUserProfile(updateObj))
      store.dispatch(turnOffPasswordEditMode())
    }
  }

  cancelEdit() {
    this.setState({
      passwordError: '',
      passwordValue: '',
      passwordConfirmationValue: ''
    })
    store.dispatch(turnOffPasswordEditMode())
  }

  render() {
    return (<div>
      <form className="form-inline" onSubmit={this.sendPasswords.bind(this)}>
        <PasswordForm label="password-reset"
                      passwordUpdate={this.updateUserPassword.bind(this)}
                      passwordConfirmationUpdate={this.updateUserPasswordConfirmation.bind(this)}
                      passwordError={this.state.passwordError}
                      validatePasswords={this.validatePasswords.bind(this)}
                      passwordValue={this.state.passwordValue}
                      passwordConfirmationValue={this.state.passwordConfirmationValue}
        />
          <button type="submit" className="btn btn-success" >Save</button>
          <button type="button" className="btn btn-danger" onClick={this.cancelEdit.bind(this)} >Cancel</button>
      </form>
    </div>)
  }
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps)(UserPassword)