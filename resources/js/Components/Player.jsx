import  AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../../css/player.css'

const CustomPlayer = ({ src }) => {
    return (
      <div className="custom-audio-player">
        <AudioPlayer
          src={src}
          onPlay={() => console.log('Audio is playing')}
          customAdditionalControls={[]} // Tu peux ajouter des options pour le personnaliser davantage
          showJumpControls={false}     // Retirer les boutons de saut de piste
          showVolumeControls={true}   // Retirer les boutons de volume
          style={{
            borderRadius: '10px',
            color: '#FFFFFF',
          }} // Tu peux ajouter tes styles ici ou utiliser du CSS externe
        />
      </div>
    );
  };

  export default CustomPlayer;
