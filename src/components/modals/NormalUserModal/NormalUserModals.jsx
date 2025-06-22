import React, { useState } from 'react'
import NormalUserRegistrationStepOne from './NormalUserRegistrationStepOne'
import NormalUserRegistrationStepTwo from './NormalUserRegistrationStepTwo'
import OtpTypeModal from '../MasterModal/OtpTypeModal'
import NormalUserOtpModal from './NormalUserOtpModal'
import OtpVerifyModal from '../OtpVerifyModal'

const NormalUserModals = ({ isOpen, onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [otpMethod, setOtpMethod] = useState('email')
  const [isLoading, setIsLoading] = useState(false)

  const handleStepData = (stepData) => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }))
  }

  const handleNext = (stepData) => {
    handleStepData(stepData)
    setCurrentStep(prev => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async (finalData) => {
    setIsLoading(true)
    try {
      const completeData = {
        ...formData,
        ...finalData,
        phoneNumber: `+994${formData.phoneNumber}`
      }
      setFormData({ ...formData, email: finalData.email })
      console.log('Submitting normal user data:', completeData)

      const nameParts = completeData.fullName.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''


      const formDataToSend = new FormData()
      formDataToSend.append('FirstName', firstName)
      formDataToSend.append('LastName', lastName)
      formDataToSend.append('Email', completeData.email)
      formDataToSend.append('Password', completeData.password)
      formDataToSend.append('ConfirmPassword', completeData.confirmPassword)
      formDataToSend.append('PhoneNumber', completeData.phoneNumber)
      formDataToSend.append('Address', completeData.address)
      if (completeData.profilePicture) {
        formDataToSend.append('ProfilePicture', completeData.profilePicture)
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Auth/register/user`, {
        method: 'POST',
        body: formDataToSend
      })

      if (response.ok) {
        setCurrentStep(prev => prev + 1)
      } else {
        const errorData = await response.text()
        console.error('Registration failed:', errorData)
        throw new Error('Registration failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      throw error

    }
    finally {
      setIsLoading(false)
    }
  }

  const handleSelectMethod = async (method) => {
    try {
      setOtpMethod(method)

      console.log(formData)
      if (method === 'email') {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Auth/send-email-confirmation`, {
          method: 'POST',
          body: JSON.stringify({ email: formData.email }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Auth/otp-create`, {
          method: 'POST',
          body: JSON.stringify({ phoneNumber: `+994${formData.phoneNumber}` }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

      }
      setCurrentStep(prev => prev + 1)
    } catch (error) {
      console.error(error)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {currentStep === 1 && (
        <NormalUserRegistrationStepOne
          onNext={handleNext}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
      {currentStep === 2 && (
        <NormalUserRegistrationStepTwo
          onNext={handleSubmit}
          onBack={handleBack}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
          isLoading={isLoading}
        />
      )}
      {currentStep === 3 && (
        <OtpTypeModal
          onSelectMethod={handleSelectMethod}
          onBack={handleBack}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}

      {currentStep === 4 && otpMethod === 'email' && (
        <NormalUserOtpModal
          onBack={handleBack}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
      {currentStep === 4 && otpMethod === 'phone' && (
        <OtpVerifyModal
          onBack={handleBack}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
    </>
  )
}

export default NormalUserModals