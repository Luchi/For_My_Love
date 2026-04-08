import { useState } from 'react';
import { AvatarDialog } from './components/AvatarDialog';
import { InventoryUnlocker } from './components/InventoryUnlocker';
import { Proposal } from './components/Proposal';
import confetti from 'canvas-confetti';
import { MergedInventory } from './components/MergedInventory';
import './App.css';

const hisItems = [
  {
    icon: '/icons/Vityas_PC.png',
    name: 'ПК Вити',
    description: 'Боевая станция. Запускает любую игру.'
  },
  {
    icon: '/icons/guitar.png',
    name: 'Гитара',
    description: 'Струны настроения. Играет, когда скучаешь.'
  },
  {
    icon: '/icons/Vmonstr.png',
    name: 'Монстр',
    description: 'Вкусный заряд энергии.'
  }
];

const herItems = [
  {
    icon: '/icons/Vityas_PC.png',
    name: 'ПК Лучи',
    description: 'Боевая станция. Запускает любую игру.'
  },
  {
    icon: '/icons/Lcat.png',
    name: 'Котя',
    description: 'Милый спутник жизни.'
  },
  {
    icon: '/icons/Lmonstr.png',
    name: 'Монстр',
    description: 'Вкусный заряд энергии.'
  }
];

function App() {
  const [step, setStep] = useState<'dialog' | 'unlock' | 'proposal' | 'merged'>('dialog');
  const [proposalVisible, setProposalVisible] = useState(false);
  const [bgType, setBgType] = useState<'default' | 'firstotk' | 'secondotk'>('default');
  const [proposalKey, setProposalKey] = useState(0);

  const changeBackground = (type: 'firstotk' | 'secondotk' | 'default') => setBgType(type);

  const handleDialogComplete = () => setStep('unlock');

  const handleBothViewed = () => {
    setStep('proposal');
    setProposalVisible(true);
    setBgType('default');
    setProposalKey(prev => prev + 1);
  };

  const handleAccept = () => {
    setProposalVisible(false);
    setStep('merged');
    setBgType('default');
    confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className="app">
      <div className={`bg-layer ${bgType}`}></div>
      {step === 'dialog' && <AvatarDialog onDialogComplete={handleDialogComplete} />}
      {step === 'unlock' && (
        <InventoryUnlocker
          hisItems={hisItems}
          herItems={herItems}
          onBothViewed={handleBothViewed}
        />
      )}
      {step === 'proposal' && (
        <Proposal
          key={proposalKey}
          visible={proposalVisible}
          onAccept={handleAccept}
          onChangeBackground={changeBackground}
        />
      )}
      {step === 'merged' && (
        <MergedInventory hisItems={hisItems} herItems={herItems} />
      )}
    </div>
  );
}

export default App;