import { Link } from 'react-router-dom'

export const AuthLink = ({
  question,
  linkText,
  linkTo
}: {
  question: string
  linkText: string
  linkTo: string
}) => {
  return (
    <div className='text-center text-sm'>
      {question}{' '}
      <Link to={linkTo}>
        <div className='underline underline-offset-4'>{linkText}</div>
      </Link>
    </div>
  )
}
