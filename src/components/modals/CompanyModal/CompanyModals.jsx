import React, { useState } from 'react'
import CompanyRegistrationStepOne from './CompanyRegistrationStepOne'
import CompanyRegistrationStepTwo from './CompanyRegistrationStepTwo'
import CompanyRegistrationStepThree from './CompanyRegistrationStepThree'
import CompanyOtpTypeModal from './CompanyOtpTypeModal'
import CompanyOtpModal from './CompanyOtpModal'

const CompanyModals = ({ isOpen, onClose, onSuccess }) => {
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
      setFormData({...formData, email: finalData.email})
      console.log('Submitting company data:', completeData)

      const formDataToSend = new FormData()
      formDataToSend.append('CompanyName', completeData.companyName)
      formDataToSend.append('Email', completeData.email)
      formDataToSend.append('Password', completeData.password)
      formDataToSend.append('ConfirmPassword', completeData.confirmPassword)
      formDataToSend.append('PhoneNumber', completeData.phoneNumber)
      formDataToSend.append('TaxId', completeData.voen)
      formDataToSend.append('Address', completeData.address)
      formDataToSend.append('SalesCategoryId', completeData.salesCategory)
      // Logo is optional for now, can be added later
      formDataToSend.append('Logo', '')

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Auth/register/company`, {
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
        // todo: implement phone OTP
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
        <CompanyRegistrationStepOne 
          onNext={handleNext}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
      {currentStep === 2 && (
        <CompanyRegistrationStepTwo 
          onNext={handleNext}
          onBack={handleBack}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
      {currentStep === 3 && (
        <CompanyRegistrationStepThree 
          onNext={handleSubmit}
          onBack={handleBack}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
          isLoading={isLoading}
        />
      )}
      {currentStep === 4 && (
        <CompanyOtpTypeModal
          onSelectMethod={handleSelectMethod}
          onBack={handleBack}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
      {currentStep === 5 && (
        <CompanyOtpModal
          onBack={handleBack}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
    </>
  )
}

export default CompanyModals