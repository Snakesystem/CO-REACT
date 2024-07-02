import { createRef, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import FormWizard from "react-form-wizard-component";

const tabContent = [
  {
    title: "Personal Info",
    icon: "bi bi-person",
    header: "Personal",
  },
  {
    title: "Data bank",
    icon: "bi bi-bank",
    header: "Bank",
  },
  {
    title: "Upload File",
    icon: "bi bi-cloud-arrow-up",
    header: "Doc",
  },
]

export default function FormLayout() {

  const formWizardRef  = createRef();
  const { pathname } = useLocation()

  const personalInfo = () => {
    formWizardRef.current?.goToTab(0)
  };
  const dataBank = () => {
    formWizardRef.current?.goToTab(1);
  };

  const uploadFile = () => {
    formWizardRef.current?.goToTab(2);
  };

  useEffect(() => {
    if(pathname === '/cif/personalinfo') {
      formWizardRef.current?.goToTab(0)
    } else if(pathname === '/cif/databank') {
      formWizardRef.current?.goToTab(1)
    } else if(pathname === '/cif/datapendukung') {
      formWizardRef.current?.goToTab(2)
    }
  }, [pathname, formWizardRef])

  return (
    <section className="page-client">
      <div className="container">
        <div className="row mb-3">
          <div className="col-xs-12 wizard-form">
            <FormWizard ref={formWizardRef} color="#094899" stepSize="lg">
              {tabContent.map((tab) => (
                <FormWizard.TabContent key={tab} title={tab.header} icon={tab.icon}>
                  <div className="col-xs-12">
                    <div className="card text-start">
                      <div className="card-header">
                        <h3>{tab.title}</h3>
                      </div>
                      <div className="card-body">
                        <Outlet context={{ personalInfo, dataBank, uploadFile }}/>
                      </div>
                    </div>
                  </div>
                </FormWizard.TabContent>
              ))}
            </FormWizard>
          </div>
        </div>
      </div>
    </section>
  )
}
