import { MonsterAwakened } from '../Illustrators/monster/cyan';
import { MonsterSad } from '../Illustrators/monster/blue';
import { MonsterAlert } from '../Illustrators/monster/orange';
import { MonsterHatred } from '../Illustrators/monster/purple';
import { MonsterAngry } from '../Illustrators/monster/red';
import { MonsterResoect } from '../Illustrators/monster/green';
import { MonsterThriller } from '../Illustrators/monster/teal';
import { MonsterHappy } from '../Illustrators/monster/yellow';

export default function Monster({ color }: {color: string}) {
  switch (color) {
    case 'yellow':
      return <MonsterHappy />;
    case 'green':
      return <MonsterResoect />;
    case 'teal':
      return <MonsterThriller />;
    case 'cyan':
      return <MonsterAwakened />;
    case 'blue':
      return <MonsterSad />;
    case 'purple':
      return <MonsterHatred />;
    case 'red':
      return <MonsterAngry />;
    case 'orange':
      return <MonsterAlert />;
    default:
      return <MonsterHappy />;
  }
}