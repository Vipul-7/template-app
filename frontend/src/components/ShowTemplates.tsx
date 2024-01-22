import { TemplateData } from '@/lib/types'
import { CardTemplate } from './CardTemplate'

interface Props {
  data: TemplateData[]
}

const ShowTemplates = (props: Props) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {props.data.map((item) => (
        <CardTemplate key={item.id} template={item} />
      ))}
    </div>
  )
}

export default ShowTemplates