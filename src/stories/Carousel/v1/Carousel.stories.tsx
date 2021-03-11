import React from 'react'
import { Story } from '@storybook/react'
import Carousel, { Props as CarouselProps } from '../../../lib/components/Carousel/v1/Carousel'
import Slides from '../../../lib/components/Carousel/v1/Slides'
import Slide from '../../../lib/components/Carousel/v1/Slide'
import Dots from '../../../lib/components/Carousel/v1/Dots'
import Controls from '../../../lib/components/Carousel/v1/Controls'
import { Next, Play, Previous } from '../../../lib/components/Carousel/v1/Buttons'

export default {
  title: 'Carousel/v1',
  component: Carousel,
}

const Template: Story<CarouselProps> = (args) => <Carousel {...args} />

export const Default = Template.bind({})
Default.args = {
  children: [
    <Slides>
      <Slide><img src="https://picsum.photos/id/237/200/200" alt="A good boi" /></Slide>
      <Slide><img src="https://picsum.photos/id/1/200/200" alt="me rn" /></Slide>
      <Slide><img src="https://picsum.photos/id/1002/200/200" alt="Now I'm thursty" /></Slide>
      <Slide><img src="https://picsum.photos/id/1003/200/200" alt="Oh deer!" /></Slide>
      <Slide><img src="https://picsum.photos/id/1015/200/200" alt="The amazon or something" /></Slide>
      <Dots />
      <Controls>
        <Previous />
        <Play />
        <Next />
      </Controls>
    </Slides>,
  ],
}

export const controlsOutside = Template.bind({})
controlsOutside.args = {
  children: [
    <Slides>
      <Slide><img src="https://picsum.photos/id/237/200/200" alt="A good boi" /></Slide>
      <Slide><img src="https://picsum.photos/id/1/200/200" alt="me rn" /></Slide>
      <Slide><img src="https://picsum.photos/id/1002/200/200" alt="Now I'm thirsty" /></Slide>
      <Slide><img src="https://picsum.photos/id/1003/200/200" alt="Oh deer!" /></Slide>
      <Slide><img src="https://picsum.photos/id/1015/200/200" alt="The amazon or something" /></Slide>
    </Slides>,
    <Dots />,
    <Controls>
      <Previous />
      <Play />
      <Next />
    </Controls>,
  ],
}

export const controlsInTheMiddle = Template.bind({})
controlsInTheMiddle.args = {
  children: [
    <Slides>
      <Slide><img src="https://picsum.photos/id/237/200/200" alt="A good boi" /></Slide>
      <Slide><img src="https://picsum.photos/id/1/200/200" alt="me rn" /></Slide>
      <Slide><img src="https://picsum.photos/id/1002/200/200" alt="Now I'm thursty" /></Slide>
      <Dots />
      <Controls>
        <Previous />
        <Play />
        <Next />
      </Controls>
      <Slide><img src="https://picsum.photos/id/1003/200/200" alt="Oh deer!" /></Slide>
      <Slide><img src="https://picsum.photos/id/1015/200/200" alt="The amazon or something" /></Slide>
    </Slides>,
  ],
}

export const dotsInControls = Template.bind({})
dotsInControls.args = {
  children: [
    <Slides>
      <Slide><img src="https://picsum.photos/id/237/200/200" alt="A good boi" /></Slide>
      <Slide><img src="https://picsum.photos/id/1/200/200" alt="me rn" /></Slide>
      <Slide><img src="https://picsum.photos/id/1002/200/200" alt="Now I'm thursty" /></Slide>
      <Slide><img src="https://picsum.photos/id/1003/200/200" alt="Oh deer!" /></Slide>
      <Slide><img src="https://picsum.photos/id/1015/200/200" alt="The amazon or something" /></Slide>
    </Slides>,
    <Controls>
      <Previous />
      <Dots />
      <Next />
    </Controls>,
  ],
}
