import React, { useState } from 'react'
import MasterRegistrationStepOne from './MasterRegistrationStepOne'
import MasterRegistrationStepTwo from './MasterRegistrationStepTwo'
import MasterRegistrationStepThree from './MasterRegistrationStepThree'

const MasterModals = ({ isOpen, onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})

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
    try {
      const completeData = {
        ...formData,
        ...finalData,
        phoneNumber: `+994${formData.phoneNumber?.slice(1)}`
      }

      console.log(completeData)
      
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
      formDataToSend.append('Specizalizations', completeData.specialty)
      formDataToSend.append('HaveTaxId', completeData.voen ? 'true' : 'false')
      formDataToSend.append('TaxId', completeData.voen || '')
      formDataToSend.append('Address', completeData.address)
      formDataToSend.append('Experience', completeData.experience.toString())
      formDataToSend.append('Price', completeData.price.toString())
      

   
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Auth/register/worker`, {
        method: 'POST',
        body: formDataToSend
      })

      if (response.ok) {
        onSuccess()
      } else {
        const errorData = await response.text()
        console.error('Registration failed:', errorData)
        throw new Error('Registration failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      throw error
    }
  }

  if (!isOpen) return null

  return (
    <>
      {currentStep === 1 && (
        <MasterRegistrationStepOne 
          onNext={handleNext}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
      {currentStep === 2 && (
        <MasterRegistrationStepTwo 
          onNext={handleNext}
          onBack={handleBack}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
      {currentStep === 3 && (
        <MasterRegistrationStepThree 
          onNext={handleSubmit}
          onBack={handleBack}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
    </>
  )
}

export default MasterModals