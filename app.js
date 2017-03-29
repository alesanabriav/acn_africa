import multipleRender from './lib/mutiple_render';
import Donate from './components/donate/index';
import Slider from './lib/slider';
import SliderVideos from './lib/sliderVideos';
import VideoModal from './lib/videoModal';

Slider();
SliderVideos();
VideoModal();

multipleRender('.bs-donate', Donate);
