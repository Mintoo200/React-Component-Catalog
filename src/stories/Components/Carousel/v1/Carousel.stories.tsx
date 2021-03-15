import React from 'react'
import { Story } from '@storybook/react'
import Carousel, { Props as CarouselProps } from '../../../../lib/components/Carousel/v1/Carousel'
import Slides from '../../../../lib/components/Carousel/v1/Slides'
import Slide from '../../../../lib/components/Carousel/v1/Slide'
import Dots from '../../../../lib/components/Carousel/v1/Dots'
import Controls from '../../../../lib/components/Carousel/v1/Controls'
import { Next, Play, Previous } from '../../../../lib/components/Carousel/v1/Buttons'

const documentation = `
## API
\`\`\`xml
<Carousel isPlaying={true}>
  <Slides>
    <Slide><img src="https://picsum.photos/id/237/200/200" alt="A good boi" /></Slide>
    <Slide><img src="https://picsum.photos/id/1/200/200" alt="me rn" /></Slide>
    <Slide><img src="https://picsum.photos/id/1002/200/200" alt="Now I'm thirsty" /></Slide>
    <Slide><img src="https://picsum.photos/id/1003/200/200" alt="Oh deer!" /></Slide>
    <Slide><img src="https://picsum.photos/id/1015/200/200" alt="The amazon or something" /></Slide>
  </Slides>
  <Dots />
  <Controls>
    <Previous />
    <Play />
    <Next />
  </Controls>
</Carousel>
\`\`\`
`

export default {
  title: 'Components/Carousel/v1',
  component: Carousel,
  parameters: {
    componentSource: {
      url: [
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FCarousel%2Fv1%2FCarousel%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FCarousel%2Fv1%2FSlides%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FCarousel%2Fv1%2FSlide%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FCarousel%2Fv1%2FContext%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FCarousel%2Fv1%2FReducer%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FCarousel%2Fv1%2FDots%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FCarousel%2Fv1%2FControls%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FCarousel%2Fv1%2FButtons%2Etsx/raw?ref=master',
      ],
      language: 'javascript',
    },
    docs: {
      description: {
        component: documentation,
      },
    },
  },
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

export const customButtons = Template.bind({})
customButtons.args = {
  children: [
    <Slides>
      <Slide><img src="https://picsum.photos/id/237/200/200" alt="A good boi" /></Slide>
      <Slide><img src="https://picsum.photos/id/1/200/200" alt="me rn" /></Slide>
      <Slide><img src="https://picsum.photos/id/1002/200/200" alt="Now I'm thursty" /></Slide>
      <Slide><img src="https://picsum.photos/id/1003/200/200" alt="Oh deer!" /></Slide>
      <Slide><img src="https://picsum.photos/id/1015/200/200" alt="The amazon or something" /></Slide>
    </Slides>,
    <Dots />,
    <Controls>
      <Previous>Hello</Previous>
      <Play>
        <div>Start</div>
        <div>Stop</div>
      </Play>
      <Next>Bye</Next>
    </Controls>,
  ],
}
