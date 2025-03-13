import React from 'react'

function Footer() {
  return (
    <footer className="my-7 text-center text-gray-500">
    <p className="text-sm">&copy; {new Date().getFullYear()} Elixir All rights reserved.</p>
    <p className="text-xs">Designed & Developed by <span className="font-semibold text-gray-600">Owais Khan</span></p>
  </footer>
  )
}

export default Footer