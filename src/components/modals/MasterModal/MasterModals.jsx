import React, { useState } from 'react'
import MasterRegistrationStepOne from './MasterRegistrationStepOne'
import MasterRegistrationStepTwo from './MasterRegistrationStepTwo'
import MasterRegistrationStepThree from './MasterRegistrationStepThree'
import MasterRegistrationStepFour from './MasterRegistrationStepFour'
import OtpTypeModal from './OtpTypeModal'
import MasterOtpModal from './MasterOtpModal'
const MasterModals = ({ isOpen, onClose, onSuccess, specializations }) => {
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
      formDataToSend.append('ProfessionId', completeData.professionId || '')
      if (Array.isArray(completeData.specialty)) {
        completeData.specialty.forEach(specId => {
          formDataToSend.append('Specizalizations', specId)
        })
      }
      formDataToSend.append('HaveTaxId', completeData.voen ? 'true' : 'false')
      formDataToSend.append('TaxId', completeData.voen || '')
      formDataToSend.append('Address', completeData.address)
      formDataToSend.append('MeasurementUnitId', completeData.measurementUnitId || '')
      formDataToSend.append('Experience', completeData.experience?.toString() || '0')
      formDataToSend.append('Price', completeData.price ? parseFloat(completeData.price).toString() : '0')

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Auth/register/worker`, {
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
        // todo
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
          onNext={handleNext}
          onBack={handleBack}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
          specializations={specializations}
        />
      )}
      {currentStep === 4 && (
        <MasterRegistrationStepFour
          onNext={handleSubmit}
          onBack={handleBack}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
          isLoading={isLoading}
        />
      )}
      {currentStep === 5 && (
        <OtpTypeModal
          onSelectMethod={handleSelectMethod}
          onBack={handleBack}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
      {currentStep === 6 && (
        <MasterOtpModal
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