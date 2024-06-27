import React, { useState } from 'react'
import { lazyLoadComponents } from '../../utils/utility';

const BCAForm = lazyLoadComponents(import("../../components/layout/bank/BCAForm"))
const BRIForm = lazyLoadComponents(import("../../components/layout/bank/BRIForm"))
const PermataForm = lazyLoadComponents(import("../../components/layout/bank/PermataForm"))

export default function DataBank() {

  const [bank] = useState('bca');

  return (
    <div>
      { bank === "bca" ? <BCAForm/> : bank === "bri" ? <BRIForm/> : bank === 'permata' ? <PermataForm/> : "Bank not found" }
    </div>
  )
}
