import { ExtensionDropdown } from '../extension-dropdown/extension-dropdown'
import { UserDropdown } from './user-dropdown'

export const HeaderRight = () => {
  return (
    <div className='flex items-center justify-end gap-4'>
      <ExtensionDropdown />
      <UserDropdown />
    </div>
  )
}
