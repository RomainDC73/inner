import  AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../../css/player.css'

const CustomPlayer = ({ src, ...props }) => {
    return (
      <div className="custom-audio-player w-full max-w-xl mx-auto">
        <AudioPlayer
          src={src}
          {...props}
          customAdditionalControls={[]}
          showJumpControls={false}
          showVolumeControls={true}
        />
      </div>
    );
  };

  export default CustomPlayer;
