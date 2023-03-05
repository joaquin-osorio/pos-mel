import { useState, useEffect } from 'react'

export const useSellerName = (seller) => {
  const [sellerName, setSellerName] = useState('')

  useEffect(() => {
    fetch(`https://api.mercadolibre.com/users/${seller}`)
      .then((res) => res.json())
      .then((data) => {
        setSellerName(data.nickname)
      })
  }, [seller])

  return sellerName
}
