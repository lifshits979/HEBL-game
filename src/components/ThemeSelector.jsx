import * as Select from '@radix-ui/react-select';
import './ThemeSelector.css';

export default function ThemeSelect({value, onChange, gameRegime }) {
  return(
  <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="theme-selector">
        <Select.Value placeholder="Выбери тему" />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content position="popper" side="bottom" className="theme-options">
          <Select.Viewport>
            <Select.Item value="no-theme" className="selector-item">
              <Select.ItemText>{`🌐${(gameRegime==='ru') ? 'Все темы' : 'All Topics'}`}</Select.ItemText>
            </Select.Item>

            <Select.Item value="school" className="selector-item">
                <Select.ItemText>{`📚${(gameRegime==='ru') ? 'Школа' : 'School'}`}</Select.ItemText>
            </Select.Item>

            <Select.Item value="university" className="selector-item">
              <Select.ItemText>{`🎓${(gameRegime==='ru') ? 'Университет' : 'University'}`}</Select.ItemText>
            </Select.Item>

            <Select.Item value="football" className="selector-item">
              <Select.ItemText>{`⚽${(gameRegime==='ru') ? 'Футбол' : 'Football'}`}</Select.ItemText>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}


