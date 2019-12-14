import Message from 'element-ui/lib/message'
import i18n from '../i18n'

export function copyToClipboard (content) {
  const textarea = document.createElement('textarea')
  textarea.value = content
  textarea.style.opacity = 0
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('Copy')
  document.body.removeChild(textarea)
  Message.success(i18n.t('DefaultLocale.copyToClipboardCompleted'))
}
