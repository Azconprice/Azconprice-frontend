import React, { useState } from 'react'
import CompanyRegistrationStepOne from './CompanyRegistrationStepOne'
import CompanyRegistrationStepTwo from './CompanyRegistrationStepTwo'
import CompanyRegistrationStepThree from './CompanyRegistrationStepThree'

const CompanyModals = ({ isOpen, onClose, onSuccess }) => {
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
        ...finalData
      }
      
      // TODO: Implement your API call here
      console.log('Submitting company data:', completeData)
      
      onSuccess()
    } catch (error) {
      console.error('Error submitting form:', error)
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
        />
      )}
    </>
  )
}

export default CompanyModals