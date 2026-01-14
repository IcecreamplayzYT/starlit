# Introduction

Park UI beautifully-designed, accessible components system and code distribution platform. Built with Panda CSS and supporting a wide range of JS frameworks

Many popular UI component libraries require installing NPM packages and importing their components so you can use them in your app. 
This works very well until you need to customize a component or add a component that doesn't exist in the library. 
You end up wrapping library components, overriding styles with workarounds, or mixing incompatible APIs from different libraries.

**Park UI solves these problems with the following principles**

## Open Code

Park UI gives you direct access to component source code, giving you complete ownership and flexibility. This has several key benefits:

* **Full Control:** Every component's implementation and recipe is fully exposed and readable.
* **Easy Customization:** Change any aspect of a component to match your specific design system and functional needs.
* **AI Ready:** Direct access to the code makes it straightforward for LLMs to read, understand, and even improve your components.
* **No More Bug Reports:** Fix it directly in your codebase without waiting for library maintainers.

*Want to add a new variant to a button or change an existing one? You simply edit the button recipe directly. No need to override or tinker with external APIs.*

## Composition

All Park UI components are built on top of [Ark UI](https://ark-ui.com), a headless component library designed for building scalable design systems. 
Every component is architected with composability at its core, enabling seamless combination and customization without complex workarounds.

This shared, composable interface is predictable for both developers and AI tools, maintaining consistency even when switching JavaScript frameworks.

## Code Distribution

As explained above Park UI takes a different approach from traditional component libraries by distributing components as source code rather than shipping them as an NPM package. <br />There are two convenient ways to obtain components:

* **CLI:** Install components directly into your project using the Park UI CLI.
* **Docs:** Browse and copy component source code directly from this website.


## Beautiful Design

Developed in collaboration with [Brains & Pixels](https://x.com/Brainsandpixels), Park UI provides a large collection of components that have carefully chosen default styles.
They are designed to look good on their own and to work well together as a consistent system.

* **Minimalistic Design:** Your UI has a clean and minimal look without extra work.
* **Consistent Styling:** Components naturally fit with one another. Each component is built to match the others, keeping your UI consistent.
* **Customizable Foundation:** Modify component recipes to adapt the design system to your brand requirements.
* **Design Integration:** Use the [Figma Kit](/docs/figma) to prototype and design with Park UI components.

## AI Ready

The architecture of Park UI makes it easy for AI tools to work with your code. Its open code and consistent API allow AI models to read, understand, and even generate new components that integrate seamlessly with your existing design system.

# Theming

This guide covers the key differences Park UI introduces to theming.

Park UI extends the default [Panda Preset](https://www.npmjs.com/package/@pandacss/preset-panda) with a minimal, systematic design approach. It introduces key adjustments to component sizing and variants to ensure alignment and visual consistency across your UI.

## Components

Park UI components are designed with consistent sizing and standardized variants to ensure visual harmony across your interface.

### Sizing

Park UI organizes component sizing into two categories:

* **Primary components** — core interactive elements that drive user actions (e.g., Buttons, Inputs, Selects).
* **Secondary components** — supporting elements that complement primary interactions (e.g., Badges, Checkboxes, Switches).

This categorization establishes a clear hierarchy and guarantees alignment. Components within the same category share identical heights for a given size token. For example, both a `md` Button and a `md` Input are exactly `40px` tall, ensuring perfect alignment when placed together.

<ComponentSizing />

### Variants

Variants are standardized across components for a unified look and feel. Park UI defines five shared variants:

* `solid`
* `subtle`
* `surface`
* `outline`
* `plain`

This consistency allows you to combine components without worrying about mismatched styles. Using the same variant across elements guarantees visual harmony.

#### Solid

High-contrast background with inverted foreground. Use for primary CTAs, submit buttons, and main actions.

<VariantPreview variant="solid" />

#### Subtle

Tinted background with matching foreground. Use for badges, tags, selected states, and secondary highlights.

<VariantPreview variant="subtle" />

#### Surface

Background with visible border and hover states. Use for cards, menu items, selectable lists, and elevated containers.

<VariantPreview variant="surface" />

#### Outline

Border-only with transparent background. Use for secondary actions, cancel buttons, filters, and tertiary controls.

<VariantPreview variant="outline" />

#### Plain

Minimal style with background on interaction. Use for text buttons, links, tabs, and ghost actions.

<VariantPreview variant="plain" />

## Colors

The biggest change Park UI introduces is its color system. Instead of the `50–950` scale used in Panda CSS, Park UI is built on [Radix Colors](https://www.radix-ui.com/colors). Each color comes with 12 shades per mode (light and dark), for a total of 24 shades. This provides finer control and greater flexibility than the traditional 11-shade scale.

### Gray

<ColorGrid type="gray" />

### Accent

<ColorGrid type="accent" />

### Pairings

Park UI is built around the concept of one accent color and one gray color. When initializing your project, you'll choose which combination works best for you.

#### Neutral Pairings

If you want a neutral vibe, or you want to keep things simple, `neutral` will work well with any hue or palette.

#### Natural pairing

Alternatively, choose the gray scale which is saturated with the hue closest to your accent hue. The difference is subtle, but this will create a more colorful and harmonious vibe.

<ColorPairings />

## Tokens

### Border Radius

Radii tokens define consistent corner rounding across components. This setup makes it easy to nest border radii as shown below.

* **`l1`** – smallest radius, used inside other elements
* **`l2`** – medium radius, used when wrapping `l1`
* **`l3`** – largest radius, used when wrapping `l2`

<BorderRadiusTokens />

### Shadows

Shadows provide consistent elevation levels, from `xs` to `2xl`. Unlike the default Panda shadows, they adapt seamlessly to both light and dark mode.

<ShadowTokens />

### z-Index

# Button

A clickable component for triggering actions and user interactions.

```tsx
import { Button } from '@/components/ui'

export const App = () => {
  return <Button>Park UI</Button>
}

```

## Installation

Use the Park UI CLI to add the Button component to your project:

```bash
npx @park-ui/cli add button
```

## Usage

```tsx
import { Button } from '@/components/ui'
```

```tsx
<Button>Click me</Button>
```

## Examples

### Sizes

Use the `size` prop to change the size of the button.

```tsx
import { CircleDotIcon } from 'lucide-react'
import { Wrap } from 'styled-system/jsx'
import { Button } from '@/components/ui'

export const App = () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

  return (
    <Wrap gap="4">
      {sizes.map((size) => (
        <Button key={size} size={size}>
          Button <CircleDotIcon />
        </Button>
      ))}
    </Wrap>
  )
}

```

### Variants

Use the `variant` prop to change the appearance of the button.

```tsx
import { Wrap } from 'styled-system/jsx'
import { Button } from '@/components/ui'

export const App = () => {
  return (
    <Wrap gap="4">
      <Button variant="solid">Solid</Button>
      <Button variant="surface">Surface</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="plain">Plain</Button>
    </Wrap>
  )
}

```

### Icon

Use icons within a button

```tsx
import { PhoneIcon, SendIcon } from 'lucide-react'
import { Wrap } from 'styled-system/jsx'
import { Button } from '@/components/ui'

export const App = () => {
  return (
    <Wrap gap="4">
      <Button>
        <SendIcon />
        Send
      </Button>
      <Button variant="outline">
        Call us <PhoneIcon />
      </Button>
    </Wrap>
  )
}

```

### Colors

Use the `colorPalette` prop to change the appearance of the button.

```tsx
import { Wrap } from 'styled-system/jsx'
import { Button } from '@/components/ui'

export const App = () => {
  return (
    <Wrap gap="4">
      <Button colorPalette="blue">Button</Button>
      <Button colorPalette="green">Button</Button>
      <Button colorPalette="amber">Button</Button>
      <Button colorPalette="red">Button</Button>
    </Wrap>
  )
}

```

### Disabled

Use the `disabled` prop to disable the button.

```tsx
import { Button } from '@/components/ui'

export const App = () => {
  return <Button disabled>Park UI</Button>
}

```  

### Loading

Pass the `loading` and `loadingText` props to the button to show a loading spinner and add a loading text.

```tsx
import { Wrap } from 'styled-system/jsx'
import { Button } from '@/components/ui'

export const App = () => {
  return (
    <Wrap gap="4">
      <Button loading>Click me</Button>
      <Button loading loadingText="Saving...">
        Click me
      </Button>
    </Wrap>
  )
}

```

### Button Group

Use the `ButtonGroup` component to group buttons together. This component allows you pass common recipe properties to inner buttons.

```tsx
import { Button, ButtonGroup } from '@/components/ui'

export const App = () => {
  return (
    <ButtonGroup variant="outline">
      <Button>Save</Button>
      <Button>Cancel</Button>
    </ButtonGroup>
  )
}

```

To create an attached button group, pass the `attached` prop to the `ButtonGroup` component.

```tsx
import { ChevronDownIcon } from 'lucide-react'
import { Button, ButtonGroup, IconButton } from '@/components/ui'

export const App = () => {
  return (
    <ButtonGroup variant="outline" attached>
      <Button>Button</Button>
      <IconButton>
        <ChevronDownIcon />
      </IconButton>
    </ButtonGroup>
  )
}

```

### As Link

Use the `asChild` prop to render a button as a link.

```tsx
import { Button } from '@/components/ui'

export const App = () => {
  return (
    <Button asChild>
      <a href="https://park-ui.com" target="_blank" rel="noopener">
        Park UI
      </a>
    </Button>
  )
}

```

### Ref

Here's how to access the underlying element reference

```tsx
'use client'
import { useRef } from 'react'
import { Button } from '@/components/ui'

export const App = () => {
  const ref = useRef<HTMLButtonElement>(null)
  return <Button ref={ref}>Click me</Button>
}

```

## Props

| Prop | Default | Type |
| --- | --- | --- |
| `variant` | 'solid' | `'solid' | 'surface' | 'subtle' | 'outline' | 'plain'` |
| `size` | 'md' | `'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'` |

# Close Button

A button component specifically designed for closing modals and overlays.

```tsx
import { CloseButton } from '@/components/ui'

export const App = () => {
  return <CloseButton />
}

```

## Installation

Use the Park UI CLI to add the Close-button component to your project:

```bash
npx @park-ui/cli add close-button
```

## Usage

```tsx
import { CloseButton } from '@/components/ui'
```

```tsx
<CloseButton />
```

## Examples

### Sizes

Use the `size` prop to change the size of the close button.

```tsx
import { Wrap } from 'styled-system/jsx'
import { CloseButton } from '@/components/ui'

export const App = () => {
  return (
    <Wrap gap="4">
      <CloseButton size="xs" />
      <CloseButton size="sm" />
      <CloseButton size="md" />
      <CloseButton size="lg" />
      <CloseButton size="xl" />
    </Wrap>
  )
}

```

### Variants

Use the `variant` prop to change the appearance of the close button.

```tsx
import { Wrap } from 'styled-system/jsx'
import { CloseButton } from '@/components/ui'

export const App = () => {
  return (
    <Wrap gap="4">
      <CloseButton variant="solid" />
      <CloseButton variant="surface" />
      <CloseButton variant="subtle" />
      <CloseButton variant="outline" />
      <CloseButton variant="plain" />
    </Wrap>
  )
}

```

### Custom Icon

Pass the custom icon to the `children` of the close button component.

```tsx
import { XCircleIcon } from 'lucide-react'
import { CloseButton } from '@/components/ui'

export const App = () => {
  return (
    <CloseButton>
      <XCircleIcon />
    </CloseButton>
  )
}

```

## Props

| Prop | Default | Type |
| --- | --- | --- |
| `variant` | 'solid' | `'solid' | 'surface' | 'subtle' | 'outline' | 'plain'` |
| `size` | 'md' | `'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'` |

# Avatar

A component for displaying user profile images with fallback support.

```tsx
import { Avatar } from '@/components/ui'

export const App = () => {
  return (
    <Avatar.Root size="lg">
      <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056?v=4" />
      <Avatar.Fallback name="Christian Busch" />
    </Avatar.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Avatar component to your project:

```bash
npx @park-ui/cli add avatar
```

## Usage

```tsx
import { Avatar } from '@/components/ui'
```

```tsx
<Avatar.Root>
  <Avatar.Image src="https://shorturl.at/gaV8r" />
  <Avatar.Fallback name="Christian Busch" />
</Avatar.Root>
```

## Examples

### Sizes

Use the `size` prop to change the size of the avatar.

```tsx
import { Wrap } from 'styled-system/jsx'
import { Avatar } from '@/components/ui'

export const App = () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

  return (
    <Wrap gap="4">
      {sizes.map((size) => (
        <Avatar.Root size={size} key={size}>
          <Avatar.Fallback name="Christian Busch" />
          <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056?v=4" />
        </Avatar.Root>
      ))}
    </Wrap>
  )
}

```

### Variants

Use the `variant` prop to change the variant of the avatar.

```tsx
import { Wrap } from 'styled-system/jsx'
import { Avatar } from '@/components/ui'

export const App = () => {
  const variants = ['solid', 'surface', 'subtle', 'outline'] as const

  return (
    <Wrap gap="4">
      {variants.map((variant) => (
        <Avatar.Root variant={variant} size="lg" key={variant}>
          <Avatar.Fallback name="Christian Busch" />
        </Avatar.Root>
      ))}
    </Wrap>
  )
}

```

### Shapes

Use the `shape` prop to change the shape of the avatar.

```tsx
import { Wrap } from 'styled-system/jsx'
import { Avatar } from '@/components/ui'

export const App = () => {
  const shapes = ['square', 'rounded', 'full'] as const

  return (
    <Wrap gap="4">
      {shapes.map((shape) => (
        <Avatar.Root size="lg" shape={shape} key={shape}>
          <Avatar.Fallback name="Christian Busch" />
          <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056?v=4" />
        </Avatar.Root>
      ))}
    </Wrap>
  )
}

```

### Fallback

If the image fails to load, the avatar will display the user’s initial. When no name is provided, a generic icon is shown instead.

```tsx
import { Wrap } from 'styled-system/jsx'
import { Avatar } from '@/components/ui'

export const App = () => {
  return (
    <Wrap gap="4">
      <Avatar.Root size="lg">
        <Avatar.Fallback name="Christian Busch" />
        <Avatar.Image src="https://" />
      </Avatar.Root>
      <Avatar.Root size="lg">
        <Avatar.Fallback />
        <Avatar.Image src="https://" />
      </Avatar.Root>
    </Wrap>
  )
}

```

### Colors

Combine the `colorPalette` prop with some custom logic to dynamically change the color of the avatar.

```tsx
import { Wrap } from 'styled-system/jsx'
import { Avatar } from '@/components/ui'

const colorPalette = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'] as const

const pickPalette = (name: string) => {
  const index = name.charCodeAt(0) % colorPalette.length
  return colorPalette[index]
}

export const App = () => {
  return (
    <Wrap gap="4">
      <Avatar.Root size="lg" colorPalette={pickPalette('Shane Nelson')}>
        <Avatar.Fallback name="Shane Nelson" />
      </Avatar.Root>
      <Avatar.Root size="lg" colorPalette={pickPalette('Brook Lesnar')}>
        <Avatar.Fallback name="Brook Lesnar" />
      </Avatar.Root>
      <Avatar.Root size="lg" colorPalette={pickPalette('John Lennon')}>
        <Avatar.Fallback name="John Lennon" />
      </Avatar.Root>
    </Wrap>
  )
}

```

### Ring

Use the `outline` props to add a ring around the avatar.

```tsx
import { Avatar } from '@/components/ui'

export const App = () => {
  return (
    <Avatar.Root
      size="lg"
      outline="2px solid token(colors.colorPalette.solid)"
      outlineOffset="0.125em"
    >
      <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056?v=4" />
      <Avatar.Fallback name="Christian Busch" />
    </Avatar.Root>
  )
}

```

### Group

The `Group` component lets you display multiple avatars together. Use the `stacking` prop to control the order in which avatars overlap.

```tsx
import { Stack } from 'styled-system/jsx'
import { Avatar, Group } from '@/components/ui'

export const App = () => {
  return (
    <Stack gap="6">
      <Group gap="0" spaceX="-3">
        {users.map((user) => (
          <Avatar.Root key={user.name} size="lg" borderWidth="2px" borderColor="gray.surface.bg">
            <Avatar.Fallback name={user.name} />
            <Avatar.Image src={user.src} />
          </Avatar.Root>
        ))}
        <Avatar.Root size="lg" bg="colorPalette.3">
          <Avatar.Fallback>+3</Avatar.Fallback>
        </Avatar.Root>
      </Group>

      <Group gap="0" spaceX="-3">
        {users.map((user, index) => (
          <Avatar.Root
            key={user.name}
            size="lg"
            borderWidth="2px"
            borderColor="gray.surface.bg"
            style={{ zIndex: users.length - index }}
          >
            <Avatar.Fallback name={user.name} />
            <Avatar.Image src={user.src} />
          </Avatar.Root>
        ))}
        <Avatar.Root size="lg" bg="colorPalette.3">
          <Avatar.Fallback>+3</Avatar.Fallback>
        </Avatar.Root>
      </Group>

      <Group gap="0" spaceX="1">
        {users.map((user) => (
          <Avatar.Root key={user.name} size="lg">
            <Avatar.Fallback name={user.name} />
            <Avatar.Image src={user.src} />
          </Avatar.Root>
        ))}
        <Avatar.Root size="lg">
          <Avatar.Fallback>+3</Avatar.Fallback>
        </Avatar.Root>
      </Group>
    </Stack>
  )
}

const users = [
  {
    name: 'Christian Schröter',
    src: 'https://avatars.githubusercontent.com/u/1846056?v=4',
  },
  {
    name: 'Segun Adebayo',
    src: 'https://avatars.githubusercontent.com/u/6916170?v=4',
  },
  {
    name: 'Philipp Körner',
    src: 'https://avatars.githubusercontent.com/u/153984143?v=4',
  },
]

```

### Badge

Show a badge on the right corner of the avatar by composing the `Float` and `Circle` components.

```tsx
import { Circle, Float } from 'styled-system/jsx'
import { Avatar } from '@/components/ui'

export const App = () => {
  return (
    <Avatar.Root size="lg">
      <Avatar.Fallback name="Christian Busch" />
      <Float placement="bottom-end" offsetX="1" offsetY="1">
        <Circle bg="colorPalette.solid.bg" size="2" outline="0.2em solid" outlineColor="canvas" />
      </Float>
    </Avatar.Root>
  )
}

```

### Persona

Here's an example of how to use the `Avatar` component to display a user persona.

```tsx
import { Box, HStack } from 'styled-system/jsx'
import { Avatar, Text } from '@/components/ui'

export const App = () => {
  return (
    <HStack gap="4">
      <Avatar.Root size="lg">
        <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056?v=4" />
        <Avatar.Fallback name="Christian Busch" />
      </Avatar.Root>
      <Box>
        <Text fontWeight="medium">Christian Busch</Text>
        <Text color="fg.muted" textStyle="sm">
          christian@park-ui.com
        </Text>
      </Box>
    </HStack>
  )
}

```

### Next.js

Here's an example of how to compose the avatar with Next.js Image.

```tsx
import { getImageProps } from "next/image"
import { Avatar } from "@/components/ui"

export const App = () => {
  const imageProps = getImageProps({
    src: "/image.png",
  })
  return (
    <Avatar.Root>
      <Avatar.Fallback name="Christian Busch" />
      <Avatar.Image {...imageProps} />
    </Avatar.Root>
  )
}
```

### Closed Component

Here's how to setup the avatar for a closed component composition.

```tsx
import { forwardRef, type ImgHTMLAttributes } from 'react'
import { Avatar as StyledAvatar } from '@/components/ui'

type ImageProps = ImgHTMLAttributes<HTMLImageElement>

export interface AvatarProps extends StyledAvatar.RootProps {
  name?: string
  src?: string
  srcSet?: string
  loading?: ImageProps['loading']
  icon?: React.ReactElement
  fallback?: React.ReactNode
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(props, ref) {
  const { name, src, srcSet, loading, icon, fallback, children, ...rest } = props
  return (
    <StyledAvatar.Root ref={ref} {...rest}>
      <StyledAvatar.Fallback name={name}>{fallback || icon}</StyledAvatar.Fallback>
      <StyledAvatar.Image src={src} srcSet={srcSet} loading={loading} />
      {children}
    </StyledAvatar.Root>
  )
})

```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `size` | 'md' | `'full' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'` |
| `variant` | 'subtle' | `'solid' | 'surface' | 'subtle' | 'outline'` |
| `shape` | 'full' | `'full' | 'square' | 'rounded'` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `ids` | - | `Partial<{ root: string; image: string; fallback: string }>`<br/>The ids of the elements in the avatar. Useful for composition. |
| `onStatusChange` | - | `(details: StatusChangeDetails) => void`<br/>Functional called when the image loading status changes. |

### Fallback

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

### Image

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

# Badge

A component for displaying small labels and status indicators.

```tsx
import { Wrap } from 'styled-system/jsx'
import { Badge } from '@/components/ui'

export const App = () => {
  return (
    <Wrap gap="4">
      <Badge>Default</Badge>
      <Badge colorPalette="green">Success</Badge>
      <Badge colorPalette="red">Removed</Badge>
      <Badge colorPalette="purple">New</Badge>
    </Wrap>
  )
}

```

## Installation

Use the Park UI CLI to add the Badge component to your project:

```bash
npx @park-ui/cli add badge
```

## Usage

```tsx
import { Badge } from '@/components/ui'
```

```tsx
<Badge>Badge</Badge>
```

## Examples

### Icon

Render an icon within the badge directly.

```tsx
import { StarIcon } from 'lucide-react'
import { Wrap } from 'styled-system/jsx'
import { Badge } from '@/components/ui'

export const App = () => {
  return (
    <Wrap gap="4">
      <Badge variant="solid" colorPalette="blue">
        <StarIcon /> New
      </Badge>
      <Badge variant="solid" colorPalette="green">
        New <StarIcon />
      </Badge>
    </Wrap>
  )
}

```

### Variants

Use the `variant` prop to change the appearance of the badge.

```tsx
import { Wrap } from 'styled-system/jsx'
import { Badge } from '@/components/ui'

export const App = () => {
  return (
    <Wrap gap="4">
      <Badge variant="solid">Solid</Badge>
      <Badge variant="surface">Surface</Badge>
      <Badge variant="subtle">Subtle</Badge>
      <Badge variant="outline">Outline</Badge>
    </Wrap>
  )
}

```

### Sizes

Use the `size` prop to change the size of the badge.

```tsx
import { StarIcon } from 'lucide-react'
import { Wrap } from 'styled-system/jsx'
import { Badge } from '@/components/ui'

export const App = () => {
  const sizes = ['sm', 'md', 'lg', 'xl'] as const
  return (
    <Wrap gap="4">
      {sizes.map((size) => (
        <Badge key={size} size={size}>
          <StarIcon />
          Badge
        </Badge>
      ))}
    </Wrap>
  )
}

```

## Props

| Prop | Default | Type |
| --- | --- | --- |
| `variant` | 'subtle' | `'solid' | 'surface' | 'subtle' | 'outline'` |
| `size` | 'md' | `'sm' | 'md' | 'lg' | 'xl'` |

# Card

A container component for grouping related content and actions.

```tsx
import { Box } from 'styled-system/jsx'
import { Button, Card } from '@/components/ui'

export const App = () => {
  return (
    <Card.Root width={{ base: 'full', md: '50%' }}>
      <Card.Header>
        <Card.Title>Title</Card.Title>
        <Card.Description>Description</Card.Description>
      </Card.Header>
      <Card.Body>
        <Box bg="gray.subtle.bg" minH="48" borderRadius="l2" />
      </Card.Body>
      <Card.Footer>
        <Button variant="outline" colorPalette="gray">
          Secondary
        </Button>
        <Button>Primary</Button>
      </Card.Footer>
    </Card.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Card component to your project:

```bash
npx @park-ui/cli add card
```

## Usage

```tsx
import { Card } from '@/components/ui'
```

```tsx
<Card.Root>
  <Card.Header>
    <Card.Title />
    <Card.Description />
  <Card.Body />
  <Card.Footer />
</Card.Root>
```

## Examples

### Variants

Use the `variant` prop to change the visual style of the Card.

```tsx
import { Box, Grid } from 'styled-system/jsx'
import { Button, Card } from '@/components/ui'

export const App = () => {
  return (
    <Grid gap="6" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))">
      <Card.Root variant="outline">
        <Card.Header>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card.Header>
        <Card.Body>
          <Box bg="gray.subtle.bg" minH="48" borderRadius="l2" />
        </Card.Body>
        <Card.Footer>
          <Button variant="outline" colorPalette="gray">
            Secondary
          </Button>
          <Button>Primary</Button>
        </Card.Footer>
      </Card.Root>
      <Card.Root variant="elevated">
        <Card.Header>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card.Header>
        <Card.Body>
          <Box bg="gray.subtle.bg" minH="48" borderRadius="l2" />
        </Card.Body>
        <Card.Footer>
          <Button variant="outline" colorPalette="gray">
            Secondary
          </Button>
          <Button>Primary</Button>
        </Card.Footer>
      </Card.Root>
      <Card.Root variant="subtle">
        <Card.Header>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card.Header>
        <Card.Body>
          <Box bg="gray.surface.bg" minH="48" borderRadius="l2" />
        </Card.Body>
        <Card.Footer>
          <Button variant="surface" colorPalette="gray">
            Secondary
          </Button>
          <Button>Primary</Button>
        </Card.Footer>
      </Card.Root>
    </Grid>
  )
}

```

### With Image

Use the Card component to display an image.

```tsx
import { Button, Card, Image } from '@/components/ui'

export const App = () => {
  return (
    <Card.Root width={{ base: 'full', md: '50%' }}>
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
      />
      <Card.Header>
        <Card.Title>Living room Sofa</Card.Title>
        <Card.Description>
          This sofa is perfect for modern tropical spaces, baroque inspired spaces.
        </Card.Description>
      </Card.Header>
      <Card.Body />
      <Card.Footer>
        <Button variant="outline" colorPalette="gray">
          Add to cart
        </Button>
        <Button variant="solid">Buy now</Button>
      </Card.Footer>
    </Card.Root>
  )
}

```

### Horizontal

Use the Card component to display content horizontally.

```tsx
import { Box, Wrap } from 'styled-system/jsx'
import { Badge, Button, Card, Image } from '@/components/ui'

export const App = () => {
  return (
    <Card.Root flexDirection="row" overflow="hidden">
      <Image
        maxW="52"
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />
      <Box>
        <Card.Header>
          <Card.Title>The perfect latte</Card.Title>
          <Card.Description>
            Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Wrap>
            <Badge>Hot</Badge>
            <Badge>Caffeine</Badge>
          </Wrap>
        </Card.Body>
        <Card.Footer justifyContent="start">
          <Button>Buy Latte</Button>
        </Card.Footer>
      </Box>
    </Card.Root>
  )
}

```

### Within Form

Use the Card component within a form to group related fields together.

```tsx
import { GithubIcon, GitlabIcon } from 'lucide-react'
import { Divider, HStack, Stack } from 'styled-system/jsx'
import { Button, Card, Field, Input, Text } from '@/components/ui'

export const App = () => {
  return (
    <Card.Root width={{ base: 'full', md: '50%' }}>
      <Card.Header gap="1">
        <Card.Title>Sign Up</Card.Title>
        <Card.Description>
          Create an account and discover the worlds' best UI component framework.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap="4" width="full">
          <Stack direction="row">
            <Button variant="outline" colorPalette="gray" flex="1">
              <GitlabIcon />
              GitLab
            </Button>
            <Button variant="outline" colorPalette="gray" flex="1">
              <GithubIcon />
              GitHub
            </Button>
          </Stack>
          <HStack>
            <Divider flex="1" />
            <Text color="fg.subtle" textStyle="sm" whiteSpace="nowrap">
              or sign up with
            </Text>
            <Divider flex="1" />
          </HStack>
          <Field.Root>
            <Field.Label>E-Mail</Field.Label>
            <Input type="email" placeholder="Your E-Mail" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input type="password" placeholder="Your Password" />
          </Field.Root>
        </Stack>
      </Card.Body>
      <Card.Footer>
        <Button width="full">Create Account</Button>
      </Card.Footer>
    </Card.Root>
  )
}

```

### With Avatar

Use the Card component to display an avatar.

```tsx
import { CheckIcon, XIcon } from 'lucide-react'
import { HStack, Stack } from 'styled-system/jsx'
import { Avatar, Button, Card, Text } from '@/components/ui'

export const App = () => {
  return (
    <Card.Root width={{ base: 'full', md: '50%' }}>
      <Card.Header>
        <HStack gap="3">
          <Avatar.Root>
            <Avatar.Image src="https://images.unsplash.com/photo-1511806754518-53bada35f930" />
            <Avatar.Fallback name="Nate Foss" />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              Nate Foss
            </Text>
            <Text color="fg.muted" textStyle="sm">
              @natefoss
            </Text>
          </Stack>
        </HStack>
      </Card.Header>
      <Card.Body>
        <Card.Description>
          Nate Foss has requested to join your team. You can approve or decline their request.
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Button variant="subtle" colorPalette="red" flex="1">
          <XIcon />
          Decline
        </Button>
        <Button variant="subtle" colorPalette="green" flex="1">
          <CheckIcon />
          Approve
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}

```

## Props

| Prop | Default | Type |
| --- | --- | --- |
| `variant` | 'outline' | `'elevated' | 'outline' | 'subtle'` |

# Clipboard

A component for copying text content to the system clipboard.

```tsx
import { Clipboard, IconButton } from '@/components/ui'

export const App = () => {
  return (
    <Clipboard.Root value="https://park-ui.com">
      <Clipboard.Trigger asChild>
        <IconButton variant="surface" size="sm">
          <Clipboard.Indicator />
        </IconButton>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Clipboard component to your project:

```bash
npx @park-ui/cli add clipboard
```

## Usage

```tsx
import { Clipboard } from '@/components/ui'
```

```tsx
<Clipboard.Root>
  <Clipboard.Trigger>
    <Clipboard.CopyText />
    <Clipboard.Indicator />
  </Clipboard.Trigger>
  <Clipboard.Input />
</Clipboard.Root>
```

## Examples

### Button

Use the `Clipboard.Trigger` component to create a copy button.

```tsx
import { Button, Clipboard } from '@/components/ui'

export const App = () => {
  return (
    <Clipboard.Root value="https://park-ui.com">
      <Clipboard.Trigger asChild>
        <Button variant="surface" size="sm">
          <Clipboard.Indicator />
          <Clipboard.CopyText />
        </Button>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}

```

### Input

Use the `Clipboard.Input` component to create a copy input.

```tsx
import { Clipboard, IconButton, Input, InputGroup } from '@/components/ui'

export const App = () => {
  return (
    <Clipboard.Root value="https://park-ui.com">
      <Clipboard.Label textStyle="label">Document Link</Clipboard.Label>
      <InputGroup endElement={<ClipboardIconButton />}>
        <Clipboard.Input asChild>
          <Input />
        </Clipboard.Input>
      </InputGroup>
    </Clipboard.Root>
  )
}

const ClipboardIconButton = () => {
  return (
    <Clipboard.Trigger asChild>
      <IconButton variant="surface" size="xs" me="-2">
        <Clipboard.Indicator />
      </IconButton>
    </Clipboard.Trigger>
  )
}

```

### Timeout

Use the `timeout` prop to set the duration of the copied state.

```tsx
import { Clipboard, IconButton } from '@/components/ui'

export const App = () => {
  return (
    <Clipboard.Root value="https://park-ui.com" timeout={1000}>
      <Clipboard.Trigger asChild>
        <IconButton variant="surface" size="sm">
          <Clipboard.Indicator />
        </IconButton>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}

``` 

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `timeout` | 3000 | `number`<br/>The timeout for the copy operation |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `defaultValue` | - | `string`<br/>The initial value to be copied to the clipboard when rendered.
Use when you don't need to control the value of the clipboard. |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{ root: string; input: string; label: string }>`<br/>The ids of the elements in the clipboard. Useful for composition. |
| `onStatusChange` | - | `(details: CopyStatusDetails) => void`<br/>The function to be called when the value is copied to the clipboard |
| `onValueChange` | - | `(details: ValueChangeDetails) => void`<br/>The function to be called when the value changes |
| `value` | - | `string`<br/>The controlled value of the clipboard |

### Indicator

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `copied` | - | `string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<...>` |

# Icon

A component for displaying scalable vector icons.

```tsx
import { HeartIcon } from 'lucide-react'
import { Icon } from '@/components/ui'

export const App = () => {
  return (
    <Icon size="lg" color="colorPalette.solid.bg">
      <HeartIcon />
    </Icon>
  )
}

```

## Installation

Use the Park UI CLI to add the Icon component to your project:

```bash
npx @park-ui/cli add icon
```

## Usage

```tsx
import { Icon } from '@/components/ui'
```

```tsx
<Icon />
```

## Examples

### Icon Library

Integrate with popular icon sets such as [Lucide](https://lucide.dev/)

```tsx
import { RocketIcon } from 'lucide-react'
import { Icon } from '@/components/ui'

export const App = () => {
  return (
    <Icon size="lg" color="colorPalette.solid.bg">
      <RocketIcon />
    </Icon>
  )
}

```

### Sizes

Use the `size` prop to change the size of the icon.

```tsx
import { DiamondIcon } from 'lucide-react'
import { Wrap } from 'styled-system/jsx'
import { Icon } from '@/components/ui'

export const App = () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
  return (
    <Wrap gap="4">
      {sizes.map((size) => (
        <Icon key={size} size={size} color="colorPalette.solid.bg">
          <DiamondIcon />
        </Icon>
      ))}
    </Wrap>
  )
}

```

### Custom svg

Render custom SVG icons by passing SVG elements as children to the `Icon` component.

```tsx
import { Icon } from '@/components/ui'

export const App = () => {
  return (
    <Icon size="lg" color="colorPalette.solid.bg">
      <svg viewBox="0 0 32 32">
        <title>Yin and yang</title>
        <g fill="currentColor">
          <path d="M16,11.5a3,3,0,1,0-3-3A3,3,0,0,0,16,11.5Z" />
          <path d="M16.868.044A8.579,8.579,0,0,0,16,0a15.99,15.99,0,0,0-.868,31.956A8.579,8.579,0,0,0,16,32,15.99,15.99,0,0,0,16.868.044ZM16,26.5a3,3,0,1,1,3-3A3,3,0,0,1,16,26.5ZM16,15A8.483,8.483,0,0,0,8.788,27.977,13.986,13.986,0,0,1,16,2a6.5,6.5,0,0,1,0,13Z" />
        </g>
      </svg>
    </Icon>
  )
}

```

## Props

| Prop | Default | Type |
| --- | --- | --- |
| `size` | 'md' | `'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'` |

# Table

A component for displaying data in rows and columns.

```tsx
import { Table } from '@/components/ui'

export const App = () => {
  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          <Table.Header>Product</Table.Header>
          <Table.Header>Category</Table.Header>
          <Table.Header textAlign="right">Price</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {items.map((product) => (
          <Table.Row key={product.id}>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{product.category}</Table.Cell>
            <Table.Cell textAlign="right">{product.price}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Foot>
        <Table.Row>
          <Table.Cell colSpan={2}>Totals</Table.Cell>
          <Table.Cell textAlign="right">$2,199.96</Table.Cell>
        </Table.Row>
      </Table.Foot>
    </Table.Root>
  )
}

const items = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
  { id: 2, name: 'Coffee Maker', category: 'Home Appliances', price: 49.99 },
  { id: 3, name: 'Desk Chair', category: 'Furniture', price: 150.0 },
  { id: 4, name: 'Smartphone', category: 'Electronics', price: 799.99 },
  { id: 5, name: 'Headphones', category: 'Accessories', price: 199.99 },
]

```

## Installation

Use the Park UI CLI to add the Table component to your project:

```bash
npx @park-ui/cli add table
```

## Usage

```tsx
import { Table } from '@/components/ui'
```

```tsx
<Table.Root>
  <Table.Caption />
  <Table.Head>
    <Table.Row>
      <Table.Header />
    </Table.Row>
  </Table.Head>
  <Table.Body>
  <Table.Row>
    <Table.Cell />
    </Table.Row>
  </Table.Body>
  <Table.Foot>
    <Table.Row>
      <Table.Cell />
    </Table.Row>
  </Table.Foot>
</Table.Root>
```

## Examples

### Variants

Use the `variant` prop to change the appearance of the table.

```tsx
import { Stack } from 'styled-system/jsx'
import { Table } from '@/components/ui'

export const App = () => {
  const variants = ['plain', 'surface'] as const
  return (
    <Stack gap="8">
      {variants.map((variant) => (
        <Table.Root key={variant} variant={variant}>
          <Table.Head>
            <Table.Row>
              <Table.Header>Product</Table.Header>
              <Table.Header>Category</Table.Header>
              <Table.Header textAlign="right">Price</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {items.map((product) => (
              <Table.Row key={product.id}>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell textAlign="right">{product.price}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Foot>
            <Table.Row>
              <Table.Cell colSpan={2}>Totals</Table.Cell>
              <Table.Cell textAlign="right">$2,199.96</Table.Cell>
            </Table.Row>
          </Table.Foot>
        </Table.Root>
      ))}
    </Stack>
  )
}

const items = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
  { id: 2, name: 'Coffee Maker', category: 'Home Appliances', price: 49.99 },
  { id: 3, name: 'Desk Chair', category: 'Furniture', price: 150.0 },
  { id: 4, name: 'Smartphone', category: 'Electronics', price: 799.99 },
  { id: 5, name: 'Headphones', category: 'Accessories', price: 199.99 },
]

```

### Striped

Use the `striped` prop to add zebra-stripes to the table.

```tsx
import { Table } from '@/components/ui'

export const App = () => {
  return (
    <Table.Root striped>
      <Table.Head>
        <Table.Row>
          <Table.Header>Product</Table.Header>
          <Table.Header>Category</Table.Header>
          <Table.Header textAlign="right">Price</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {items.map((product) => (
          <Table.Row key={product.id}>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{product.category}</Table.Cell>
            <Table.Cell textAlign="right">{product.price}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const items = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
  { id: 2, name: 'Coffee Maker', category: 'Home Appliances', price: 49.99 },
  { id: 3, name: 'Desk Chair', category: 'Furniture', price: 150.0 },
  { id: 4, name: 'Smartphone', category: 'Electronics', price: 799.99 },
  { id: 5, name: 'Headphones', category: 'Accessories', price: 199.99 },
]

```

### Column Border

Use the `columnBorder` prop to add borders between columns.

```tsx
import { Table } from '@/components/ui'

export const App = () => {
  return (
    <Table.Root columnBorder>
      <Table.Head>
        <Table.Row>
          <Table.Header>Product</Table.Header>
          <Table.Header>Category</Table.Header>
          <Table.Header textAlign="right">Price</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {items.map((product) => (
          <Table.Row key={product.id}>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{product.category}</Table.Cell>
            <Table.Cell textAlign="right">{product.price}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const items = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
  { id: 2, name: 'Coffee Maker', category: 'Home Appliances', price: 49.99 },
  { id: 3, name: 'Desk Chair', category: 'Furniture', price: 150.0 },
  { id: 4, name: 'Smartphone', category: 'Electronics', price: 799.99 },
  { id: 5, name: 'Headphones', category: 'Accessories', price: 199.99 },
]

```

### Horizontal Scroll

Compose the `Table` component within a `ScrollArea` component to enable horizontal scrolling.

```tsx
import { ScrollArea, Table } from '@/components/ui'

export const App = () => {
  return (
    <ScrollArea.Root scrollbar="visible" size="sm" borderWidth="1px" borderRadius="l3">
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <Table.Root>
            <Table.Head>
              <Table.Row>
                <Table.Header minW="xs">Product</Table.Header>
                <Table.Header minW="xs">Category</Table.Header>
                <Table.Header minW="xs" textAlign="right">
                  Price
                </Table.Header>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {items.map((product) => (
                <Table.Row key={product.id}>
                  <Table.Cell>{product.name}</Table.Cell>
                  <Table.Cell>{product.category}</Table.Cell>
                  <Table.Cell textAlign="right">{product.price}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" />
      <ScrollArea.Scrollbar orientation="horizontal" />
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}

const items = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
  { id: 2, name: 'Coffee Maker', category: 'Home Appliances', price: 49.99 },
  { id: 3, name: 'Desk Chair', category: 'Furniture', price: 150.0 },
  { id: 4, name: 'Smartphone', category: 'Electronics', price: 799.99 },
  { id: 5, name: 'Headphones', category: 'Accessories', price: 199.99 },
]

```

### Sticky Header

Use the `stickyHeader` prop to make the table header sticky.

```tsx
import { ScrollArea, Table } from '@/components/ui'

export const App = () => {
  return (
    <ScrollArea.Root size="sm" borderRadius="l3" borderWidth="1px" height="72">
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <Table.Root variant="surface" stickyHeader>
            <Table.Head>
              <Table.Row>
                <Table.Header>Product</Table.Header>
                <Table.Header>Category</Table.Header>
                <Table.Header textAlign="right">Price</Table.Header>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {items.map((product) => (
                <Table.Row key={product.id}>
                  <Table.Cell>{product.name}</Table.Cell>
                  <Table.Cell>{product.category}</Table.Cell>
                  <Table.Cell textAlign="right">{product.price}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}

const items = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
  { id: 2, name: 'Coffee Maker', category: 'Home Appliances', price: 49.99 },
  { id: 3, name: 'Desk Chair', category: 'Furniture', price: 150.0 },
  { id: 4, name: 'Smartphone', category: 'Electronics', price: 799.99 },
  { id: 5, name: 'Headphones', category: 'Accessories', price: 199.99 },
  { id: 6, name: 'Monitor', category: 'Electronics', price: 299.99 },
  { id: 7, name: 'Blender', category: 'Home Appliances', price: 89.99 },
  { id: 8, name: 'Bookshelf', category: 'Furniture', price: 120.0 },
  { id: 9, name: 'Tablet', category: 'Electronics', price: 499.99 },
  { id: 10, name: 'Mouse', category: 'Accessories', price: 29.99 },
]

```

### Sticky Column

Here's an example that uses `data-sticky` attributes to make table columns sticky during horizontal scrolling.

```tsx
import { ScrollArea, Table } from '@/components/ui'

export const App = () => {
  return (
    <ScrollArea.Root size="sm" borderRadius="l3" borderWidth="1px" scrollbar="visible">
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <Table.Root variant="surface" stickyHeader>
            <Table.Head>
              <Table.Row>
                <Table.Header minW="40" data-pinned="left" left="0">
                  Product
                </Table.Header>
                <Table.Header minW="xs">Category</Table.Header>
                <Table.Header minW="xs">Price</Table.Header>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {items.map((product) => (
                <Table.Row key={product.id}>
                  <Table.Cell data-pinned="left" left="0">
                    {product.name}
                  </Table.Cell>
                  <Table.Cell>{product.category}</Table.Cell>
                  <Table.Cell>{product.price}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}

const items = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
  { id: 2, name: 'Coffee Maker', category: 'Home Appliances', price: 49.99 },
  { id: 3, name: 'Desk Chair', category: 'Furniture', price: 150.0 },
  { id: 4, name: 'Smartphone', category: 'Electronics', price: 799.99 },
  { id: 5, name: 'Headphones', category: 'Accessories', price: 199.99 },
]

```


### Interactive

Use the `interactive` prop to highlight rows on hover.

```tsx
import { Table } from '@/components/ui'

export const App = () => {
  return (
    <Table.Root interactive>
      <Table.Head>
        <Table.Row>
          <Table.Header>Product</Table.Header>
          <Table.Header>Category</Table.Header>
          <Table.Header textAlign="right">Price</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {items.map((product) => (
          <Table.Row key={product.id}>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{product.category}</Table.Cell>
            <Table.Cell textAlign="right">{product.price}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const items = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
  { id: 2, name: 'Coffee Maker', category: 'Home Appliances', price: 49.99 },
  { id: 3, name: 'Desk Chair', category: 'Furniture', price: 150.0 },
  { id: 4, name: 'Smartphone', category: 'Electronics', price: 799.99 },
  { id: 5, name: 'Headphones', category: 'Accessories', price: 199.99 },
]

```

## Props

| Prop | Default | Type |
| --- | --- | --- |
| `variant` | 'plain' | `'surface' | 'plain'` |
| `size` | 'md' | `'md'` |
| `striped` | - | `boolean` |
| `interactive` | - | `boolean` |
| `columnBorder` | - | `boolean` |
| `stickyHeader` | - | `boolean` |

# Accordion

A disclosure component with collapsible sections for organizing content.

```tsx
import { Accordion } from '@/components/ui'

export const App = () => {
  return (
    <Accordion.Root defaultValue={['What is Park UI?']} multiple>
      {faqItems.map((item) => (
        <Accordion.Item key={item.question} value={item.question}>
          <Accordion.ItemTrigger>
            {item.question}
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>{item.answer}</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

const faqItems = [
  {
    question: 'What is Park UI?',
    answer: 'A beautiful component library built with Ark UI and Panda CSS.',
  },
  {
    question: 'How do I get started?',
    answer: 'Visit our documentation for installation and usage guides.',
  },
  {
    question: 'Is it free to use?',
    answer: 'Yes! Park UI is completely free and open source.',
  },
]

```

## Installation

Use the Park UI CLI to add the Accordion component to your project:

```bash
npx @park-ui/cli add accordion
```

## Usage

```tsx
import { Accordion } from '@/components/ui'
```

```tsx
<Accordion.Root>
  <Accordion.Item>
    <Accordion.ItemTrigger>
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent />
  </Accordion.Item>
</Accordion.Root>
```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `variant` | 'outline' | `'outline' | 'plain'` |
| `size` | 'md' | `'md'` |
| `collapsible` | false | `boolean`<br/>Whether an accordion item can be closed after it has been expanded. |
| `lazyMount` | false | `boolean`<br/>Whether to enable lazy mounting |
| `multiple` | false | `boolean`<br/>Whether multiple accordion items can be expanded at the same time. |
| `orientation` | \vertical\ | `'horizontal' | 'vertical'`<br/>The orientation of the accordion items. |
| `unmountOnExit` | false | `boolean`<br/>Whether to unmount on exit. |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `defaultValue` | - | `string[]`<br/>The initial value of the expanded accordion items.
Use when you don't need to control the value of the accordion. |
| `disabled` | - | `boolean`<br/>Whether the accordion items are disabled |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{
  root: string
  item: (value: string) => string
  itemContent: (value: string) => string
  itemTrigger: (value: string) => string
}>`<br/>The ids of the elements in the accordion. Useful for composition. |
| `onFocusChange` | - | `(details: FocusChangeDetails) => void`<br/>The callback fired when the focused accordion item changes. |
| `onValueChange` | - | `(details: ValueChangeDetails) => void`<br/>The callback fired when the state of expanded/collapsed accordion items changes. |
| `value` | - | `string[]`<br/>The controlled value of the expanded accordion items. |

### Item

| Prop | Default | Type |
| --- | --- | --- |
| `value`* | - | `string`<br/>The value of the accordion item. |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `disabled` | - | `boolean`<br/>Whether the accordion item is disabled. |

# Carousel

A component for displaying multiple items in a rotating slideshow format.

```tsx
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Center } from 'styled-system/jsx'
import { Carousel, IconButton, Text } from '@/components/ui'

export const App = () => {
  const slides = 5

  return (
    <Carousel.Root slideCount={slides}>
      <Carousel.ItemGroup>
        {Array.from({ length: slides }, (_, index) => (
          <Carousel.Item key={index} index={index}>
            <Center bg="colorPalette.subtle.bg" height="48" borderRadius="l2">
              <Text textStyle="3xl" fontWeight="semibold" color="colorPalette.subtle.fg">
                {index + 1}
              </Text>
            </Center>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger asChild>
          <IconButton size="sm" variant="plain">
            <ChevronLeftIcon />
          </IconButton>
        </Carousel.PrevTrigger>
        <Carousel.IndicatorGroup />
        <Carousel.NextTrigger asChild>
          <IconButton size="sm" variant="plain">
            <ChevronRightIcon />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Carousel component to your project:

```bash
npx @park-ui/cli add carousel
```

## Usage

```tsx
import { Carousel } from '@/components/ui'
```

```tsx
<Carousel.Root>
  <Carousel.ItemGroup>
    <Carousel.Item  />
  </Carousel.ItemGroup>
  <Carousel.Control>
    <Carousel.PrevTrigger/>
    <Carousel.IndicatorGroup>
      <Carousel.Indicator />
    </Carousel.IndicatorGroup>
    <Carousel.NextTrigger />
  </Carousel.Control>
</Carousel.Root>
```

## Shortcuts

### IndicatorGroup

The `Carousel.IndicatorGroup` automatically renders indicators for each page. Instead of:

```tsx
<Carousel.IndicatorGroup>
  <Carousel.Indicator index={0} />
  <Carousel.Indicator index={1} />
  {/* ... */}
</Carousel.IndicatorGroup>
```
If you don't need to customize the indicators, you can use the shortcut:

```tsx
<Carousel.IndicatorGroup />
```

## Examples

### Multiple

Set the `slidesPerPage` prop to show multiple items per page.

```tsx
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Center } from 'styled-system/jsx'
import { Carousel, IconButton, Text } from '@/components/ui'

export const App = () => {
  const slides = 10

  return (
    <Carousel.Root slideCount={slides} slidesPerPage={2}>
      <Carousel.ItemGroup>
        {Array.from({ length: slides }, (_, index) => (
          <Carousel.Item key={index} index={index}>
            <Center bg="colorPalette.subtle.bg" height="40" borderRadius="l2">
              <Text textStyle="3xl" fontWeight="semibold" color="colorPalette.subtle.fg">
                {index + 1}
              </Text>
            </Center>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger asChild>
          <IconButton size="sm" variant="plain">
            <ChevronLeftIcon />
          </IconButton>
        </Carousel.PrevTrigger>
        <Carousel.IndicatorGroup />
        <Carousel.NextTrigger asChild>
          <IconButton size="sm" variant="plain">
            <ChevronRightIcon />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}

```

### Auto Play

Set the `autoPlay` prop to enable automatic sliding.

```tsx
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Center } from 'styled-system/jsx'
import { Carousel, IconButton, Text } from '@/components/ui'

export const App = () => {
  const slides = 5

  return (
    <Carousel.Root slideCount={slides} autoplay={{ delay: 2000 }} loop>
      <Carousel.ItemGroup>
        {Array.from({ length: slides }, (_, index) => (
          <Carousel.Item key={index} index={index}>
            <Center bg="colorPalette.subtle.bg" height="40" borderRadius="l2">
              <Text textStyle="3xl" fontWeight="semibold" color="colorPalette.subtle.fg">
                {index + 1}
              </Text>
            </Center>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger asChild>
          <IconButton size="sm" variant="plain">
            <ChevronLeftIcon />
          </IconButton>
        </Carousel.PrevTrigger>
        <Carousel.IndicatorGroup />
        <Carousel.NextTrigger asChild>
          <IconButton size="sm" variant="plain">
            <ChevronRightIcon />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}

```

### Images

Here is an example of a carousel displaying images.

```tsx
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Carousel, IconButton, Image } from '@/components/ui'

export const App = () => {
  return (
    <Carousel.Root slideCount={images.length} inline>
      <Carousel.ItemGroup borderRadius="l3">
        {images.map((image, index) => (
          <Carousel.Item key={index} index={index}>
            <Image src={image} width="full" height="80" />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="plain">
            <ChevronLeftIcon />
          </IconButton>
        </Carousel.PrevTrigger>
        <Carousel.IndicatorGroup />
        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="plain">
            <ChevronRightIcon />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}

const images = [
  'https://tinyurl.com/5b6ka8jd',
  'https://tinyurl.com/7rmccdn5',
  'https://tinyurl.com/59jxz9uu',
  'https://tinyurl.com/6jurv23t',
  'https://tinyurl.com/yp4rfum7',
]

```

### Vertical

Set the `orientation` prop to `vertical` to create a vertical carousel.

```tsx
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { Center } from 'styled-system/jsx'
import { Carousel, IconButton, Text } from '@/components/ui'

export const App = () => {
  const slides = 5

  return (
    <Carousel.Root slideCount={slides} orientation="vertical">
      <Carousel.ItemGroup>
        {Array.from({ length: slides }, (_, index) => (
          <Carousel.Item key={index} index={index}>
            <Center bg="colorPalette.subtle.bg" borderRadius="l2" height="full" flex="1">
              <Text textStyle="3xl" fontWeight="semibold" color="colorPalette.subtle.fg">
                {index + 1}
              </Text>
            </Center>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger asChild>
          <IconButton size="sm" variant="plain">
            <ChevronUpIcon />
          </IconButton>
        </Carousel.PrevTrigger>
        <Carousel.IndicatorGroup />
        <Carousel.NextTrigger asChild>
          <IconButton size="sm" variant="plain">
            <ChevronDownIcon />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}

```

### Scroll To

Use the `scrollTo` method to programmatically navigate to a specific slide.

```tsx
'use client'
import { useCarouselContext } from '@ark-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Center } from 'styled-system/jsx'
import { Button, Carousel, IconButton, Text } from '@/components/ui'

export const App = () => {
  const slides = 5

  return (
    <Carousel.Root slideCount={slides}>
      <ScrollToTrigger />
      <Carousel.ItemGroup>
        {Array.from({ length: slides }, (_, index) => (
          <Carousel.Item key={index} index={index}>
            <Center bg="colorPalette.subtle.bg" height="40" borderRadius="l2">
              <Text textStyle="3xl" fontWeight="semibold" color="colorPalette.subtle.fg">
                {index + 1}
              </Text>
            </Center>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger asChild>
          <IconButton size="sm" variant="plain">
            <ChevronLeftIcon />
          </IconButton>
        </Carousel.PrevTrigger>
        <Carousel.IndicatorGroup />
        <Carousel.NextTrigger asChild>
          <IconButton size="sm" variant="plain">
            <ChevronRightIcon />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}

const ScrollToTrigger = () => {
  const carousel = useCarouselContext()

  return (
    <Button variant="outline" size="sm" alignSelf="start" onClick={() => carousel.scrollTo(3)}>
      Go to slide 4
    </Button>
  )
}

```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `slideCount`* | - | `number`<br/>The total number of slides.
Useful for SSR to render the initial ating the snap points. |
| `size` | 'md' | `'md'` |
| `allowMouseDrag` | false | `boolean`<br/>Whether to allow scrolling via dragging with mouse |
| `autoplay` | false | `boolean | { delay: number }`<br/>Whether to scroll automatically. The default delay is 4000ms. |
| `defaultPage` | 0 | `number`<br/>The initial page to scroll to when rendered.
Use when you don't need to control the page of the carousel. |
| `inViewThreshold` | 0.6 | `number | number[]`<br/>The threshold for determining if an item is in view. |
| `loop` | false | `boolean`<br/>Whether the carousel should loop around. |
| `orientation` | \horizontal\ | `'horizontal' | 'vertical'`<br/>The orientation of the element. |
| `slidesPerMove` | \auto\ | `number | 'auto'`<br/>The number of slides to scroll at a time.

When set to `auto`, the number of slides to scroll is determined by the
`slidesPerPage` property. |
| `slidesPerPage` | 1 | `number`<br/>The number of slides to show at a time. |
| `snapType` | \mandatory\ | `'proximity' | 'mandatory'`<br/>The snap type of the item. |
| `spacing` | \0px\ | `string`<br/>The amount of space between items. |
| `inline` | - | `boolean` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `ids` | - | `Partial<{
  root: string
  item: (index: number) => string
  itemGroup: string
  nextTrigger: string
  prevTrigger: string
  indicatorGroup: string
  indicator: (index: number) => string
}>`<br/>The ids of the elements in the carousel. Useful for composition. |
| `onAutoplayStatusChange` | - | `(details: AutoplayStatusDetails) => void`<br/>Function called when the autoplay status changes. |
| `onDragStatusChange` | - | `(details: DragStatusDetails) => void`<br/>Function called when the drag status changes. |
| `onPageChange` | - | `(details: PageChangeDetails) => void`<br/>Function called when the page changes. |
| `padding` | - | `string`<br/>Defines the extra space added around the scrollable area,
enabling nearby items to remain partially in view. |
| `page` | - | `number`<br/>The controlled page of the carousel. |
| `translations` | - | `IntlTranslations`<br/>The localized messages to use. |

### Indicator

| Prop | Default | Type |
| --- | --- | --- |
| `index`* | - | `number`<br/>The index of the indicator. |
| `readOnly` | false | `boolean`<br/>Whether the indicator is read only. |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

### Item

| Prop | Default | Type |
| --- | --- | --- |
| `index`* | - | `number`<br/>The index of the item. |
| `snapAlign` | \start\ | `'center' | 'start' | 'end'`<br/>The snap alignment of the item. |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

# Collapsible

A component for showing and hiding content with smooth transitions.

```tsx
import { Box } from 'styled-system/jsx'
import { Button, Collapsible } from '@/components/ui'

export const App = () => {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger asChild>
        <Button variant="outline">Toggle</Button>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Box p="4" mt="3" borderWidth="1px">
          Park UI beautifully-designed, accessible components system and code distribution platform.
          Built with Panda CSS and supporting a wide range of JS frameworks
        </Box>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Collapsible component to your project:

```bash
npx @park-ui/cli add collapsible
```

## Usage

```tsx
import { Collapsible } from '@/components/ui'
```

```tsx
<Collapsible.Root>
  <Collapsible.Trigger>Toggle</Collapsible.Trigger>
  <Collapsible.Content>Content to show/hide</Collapsible.Content>
</Collapsible.Root>
```

## Examples

### Lazy Mount

Use the `lazyMount` prop to mount the content only when the collapsible is open.

```tsx
import { Box } from 'styled-system/jsx'
import { Button, Collapsible } from '@/components/ui'

export const App = () => {
  return (
    <Collapsible.Root lazyMount>
      <Collapsible.Trigger asChild>
        <Button variant="outline">Toggle</Button>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Box p="4" mt="3" borderWidth="1px">
          If you inspect the DOM, you'll notice that the content is unmounted when collapsed. This
          is useful for performance reasons when you have a lot of collapsible content.
        </Box>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

```

### Unmount on Exit

Use the `unmountOnExit` prop to unmount the content when the collapsible is closed.

```tsx
import { Box } from 'styled-system/jsx'
import { Button, Collapsible } from '@/components/ui'

export const App = () => {
  return (
    <Collapsible.Root unmountOnExit>
      <Collapsible.Trigger asChild>
        <Button variant="outline">Toggle</Button>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Box p="4" mt="3" borderWidth="1px">
          If you inspect the DOM, you'll notice that the content will be initially mounted and
          unmounted when collapsed. This is useful for improving performance and preventing
          background processes (like timers or API calls) from running when the content is hidden.
        </Box>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `lazyMount` | false | `boolean`<br/>Whether to enable lazy mounting |
| `unmountOnExit` | false | `boolean`<br/>Whether to unmount on exit. |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `collapsedHeight` | - | `string | number`<br/>The height of the content when collapsed. |
| `collapsedWidth` | - | `string | number`<br/>The width of the content when collapsed. |
| `defaultOpen` | - | `boolean`<br/>The initial open state of the collapsible when rendered.
Use when you don't need to control the open state of the collapsible. |
| `disabled` | - | `boolean`<br/>Whether the collapsible is disabled. |
| `ids` | - | `Partial<{ root: string; content: string; trigger: string }>`<br/>The ids of the elements in the collapsible. Useful for composition. |
| `onExitComplete` | - | `VoidFunction`<br/>The callback invoked when the exit animation completes. |
| `onOpenChange` | - | `(details: OpenChangeDetails) => void`<br/>The callback invoked when the open state changes. |
| `open` | - | `boolean`<br/>The controlled open state of the collapsible. |

# Alert

A component for displaying important notifications and feedback messages.

```tsx
import { Alert } from '@/components/ui'

export const App = () => {
  return (
    <Alert.Root>
      <Alert.Indicator />
      <Alert.Title>This is a title</Alert.Title>
    </Alert.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Alert component to your project:

```bash
npx @park-ui/cli add alert
```

## Usage

```tsx
import { Alert } from '@/components/ui'
```

```tsx
<Alert.Root>
  <Alert.Indicator />
  <Alert.Content>
    <Alert.Title />
    <Alert.Description />
  </Alert.Content>
</Alert.Root>
```

## Examples

### Description

Render the `Alert.Description` component to provide additional context to the alert.

```tsx
import { Alert } from '@/components/ui'

export const App = () => {
  return (
    <Alert.Root>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>This is a title</Alert.Title>
        <Alert.Description>This is a description</Alert.Description>
      </Alert.Content>
    </Alert.Root>
  )
}

```

### Status

Change the status of the alerts by passing the `status` prop. This affects the color scheme and icon used.

```tsx
import { Stack } from 'styled-system/jsx'
import { Alert } from '@/components/ui'

export const App = () => {
  const statuses = ['neutral', 'info', 'warning', 'error', 'success'] as const

  return (
    <Stack gap="4">
      {statuses.map((status) => (
        <Alert.Root key={status} status={status}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>This is a title</Alert.Title>
            <Alert.Description>This is a description</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      ))}
    </Stack>
  )
}

```

### Variants

Use the `variant` prop to change the visual style of the alert.

```tsx
import { Stack } from 'styled-system/jsx'
import { Alert } from '@/components/ui'

export const App = () => {
  const variants = ['solid', 'surface', 'subtle', 'outline'] as const

  return (
    <Stack gap="4">
      {variants.map((variant) => (
        <Alert.Root key={variant} variant={variant}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>This is a title</Alert.Title>
            <Alert.Description>This is a description</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      ))}
    </Stack>
  )
}

```

### Sizes

Use the `size` prop to change the size of the alert.

```tsx
import { Stack } from 'styled-system/jsx'
import { Alert } from '@/components/ui'

export const App = () => {
  const sizes = ['md', 'lg'] as const

  return (
    <Stack gap="4">
      {sizes.map((size) => (
        <Alert.Root key={size} size={size}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>This is a title</Alert.Title>
            <Alert.Description>This is a description</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      ))}
    </Stack>
  )
}

```

### Closable

Here's an example of how to compose the `Alert` with a close button.

```tsx
import { Alert, CloseButton } from '@/components/ui'

export const App = () => {
  return (
    <Alert.Root>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>This is a title</Alert.Title>
        <Alert.Description>This is a description</Alert.Description>
      </Alert.Content>
      <CloseButton pos="relative" top="-2" insetEnd="-2" colorPalette="blue" size="sm" />
    </Alert.Root>
  )
}

```

### Closed Component

Here's an example of a closed alert that can be opened with a button.

```tsx
import { forwardRef, type ReactElement, type ReactNode } from 'react'
import { Alert as StyledAlert } from '@/components/ui'

export interface AlertProps extends Omit<StyledAlert.RootProps, 'title'> {
  startElement?: ReactNode
  endElement?: ReactNode
  title?: ReactNode
  icon?: ReactElement
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  const { title, children, icon, startElement, endElement, ...rest } = props
  return (
    <StyledAlert.Root ref={ref} {...rest}>
      {startElement || <StyledAlert.Indicator>{icon}</StyledAlert.Indicator>}
      {children ? (
        <StyledAlert.Content>
          <StyledAlert.Title>{title}</StyledAlert.Title>
          <StyledAlert.Description>{children}</StyledAlert.Description>
        </StyledAlert.Content>
      ) : (
        <StyledAlert.Title flex="1">{title}</StyledAlert.Title>
      )}
      {endElement}
    </StyledAlert.Root>
  )
})

```


## Props

| Prop | Default | Type |
| --- | --- | --- |
| `size` | 'md' | `'md' | 'lg'` |
| `variant` | 'subtle' | `'solid' | 'surface' | 'subtle' | 'outline'` |
| `status` | 'info' | `'info' | 'warning' | 'success' | 'error' | 'neutral'` |

# Progress

A display component for showing task completion and loading states.

```tsx
import { Progress } from '@/components/ui'

export const App = () => {
  return (
    <Progress.Root defaultValue={42}>
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Progress component to your project:

```bash
npx @park-ui/cli add progress
```

## Usage

```tsx
import { Progress } from '@/components/ui'
```

```tsx
<Progress.Root>
  <Progress.Track>
    <Progress.Range />
  </Progress.Track>
  <Progress.Label />
  <Progress.ValueText />
</Progress.Root>
```

## Examples

### Sizes

Use the `size` prop to change the size of the progress bar.

```tsx
import { Stack } from 'styled-system/jsx'
import { Progress } from '@/components/ui'

export const App = () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
  return (
    <Stack gap="4">
      {sizes.map((size) => (
        <Progress.Root key={size} size={size}>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
      ))}
    </Stack>
  )
}

```

### Variants

Use the `variant` prop to change the visual style of the progress bar.

```tsx
import { Stack } from 'styled-system/jsx'
import { Progress } from '@/components/ui'

export const App = () => {
  const variants = ['solid', 'subtle'] as const
  return (
    <Stack gap="4">
      {variants.map((variant) => (
        <Progress.Root key={variant} defaultValue={42} variant={variant}>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
      ))}
    </Stack>
  )
}

```

### Colors

Use the `colorPalette` prop to change the color of the progress bar.

```tsx
import { Stack } from 'styled-system/jsx'
import { Progress } from '@/components/ui'

export const App = () => {
  const colors = ['blue', 'green', 'amber', 'red'] as const
  return (
    <Stack gap="4">
      {colors.map((color) => (
        <Progress.Root key={color} defaultValue={42} colorPalette={color}>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
      ))}
    </Stack>
  )
}

```

### Inline Label

Compose the `Progress.Label` and `Progress.ValueText` components to create an inline label for the progress bar.

```tsx
import { HStack } from 'styled-system/jsx'
import { Progress } from '@/components/ui'

export const App = () => {
  return (
    <Progress.Root defaultValue={42}>
      <HStack gap="4">
        <Progress.Label>Usage</Progress.Label>
        <Progress.Track flex="1">
          <Progress.Range />
        </Progress.Track>
        <Progress.ValueText />
      </HStack>
    </Progress.Root>
  )
}

```

### Indeterminate

Set the value to `null` to show an indeterminate progress bar.

```tsx
import { Progress } from '@/components/ui'

export const App = () => {
  return (
    <Progress.Root value={null}>
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  )
}

```

### Stripes

Set the `striped` prop to `true` to add stripes to the progress bar.

```tsx
import { Progress } from '@/components/ui'

export const App = () => {
  return (
    <Progress.Root defaultValue={42} striped>
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  )
}

```

### Animated Stripes

Set the `animated` prop to `true` to animate the stripes.

```tsx
import { Progress } from '@/components/ui'

export const App = () => {
  return (
    <Progress.Root defaultValue={42} striped animated>
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  )
}

```

### Closed Component

Here's how to setup the progress for a closed component composition.

```tsx
import { forwardRef, type ReactNode } from 'react'
import { Progress as StyledProgress } from '@/components/ui'

interface ProgressProps extends StyledProgress.RootProps {
  showValueText?: boolean
  valueText?: ReactNode
  label?: ReactNode
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(props, ref) {
  const { showValueText, valueText, label, ...rest } = props
  return (
    <StyledProgress.Root {...rest} ref={ref}>
      {label && <StyledProgress.Label>{label}</StyledProgress.Label>}
      <StyledProgress.Track>
        <StyledProgress.Range />
      </StyledProgress.Track>
      {showValueText && <StyledProgress.ValueText>{valueText}</StyledProgress.ValueText>}
    </StyledProgress.Root>
  )
})

```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `variant` | 'solid' | `'solid' | 'subtle'` |
| `shape` | 'rounded' | `'square' | 'rounded' | 'full'` |
| `size` | 'md' | `'xs' | 'sm' | 'md' | 'lg' | 'xl'` |
| `defaultValue` | 50 | `number`<br/>The initial value of the progress bar when rendered.
Use when you don't need to control the value of the progress bar. |
| `formatOptions` | { style: \percent\ } | `NumberFormatOptions`<br/>The options to use for formatting the value. |
| `locale` | \en-US\ | `string`<br/>The locale to use for formatting the value. |
| `max` | 100 | `number`<br/>The maximum allowed value of the progress bar. |
| `min` | 0 | `number`<br/>The minimum allowed value of the progress bar. |
| `orientation` | \horizontal\ | `'horizontal' | 'vertical'`<br/>The orientation of the element. |
| `striped` | - | `boolean` |
| `animated` | - | `boolean` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{ root: string; track: string; label: string; circle: string }>`<br/>The ids of the elements in the progress bar. Useful for composition. |
| `onValueChange` | - | `(details: ValueChangeDetails) => void`<br/>Callback fired when the value changes. |
| `translations` | - | `IntlTranslations`<br/>The localized messages to use. |
| `value` | - | `number`<br/>The controlled value of the progress bar. |

### View

| Prop | Default | Type |
| --- | --- | --- |
| `state`* | - | `ProgressState` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

# Skeleton

A placeholder component for showing loading states of content.

```tsx
import { Stack, Wrap } from 'styled-system/jsx'
import { Skeleton, SkeletonCircle } from '@/components/ui'

export const App = () => {
  return (
    <Wrap gap="4">
      <SkeletonCircle boxSize="12" />
      <Stack flex="1">
        <Skeleton height="5" />
        <Skeleton height="5" width="80%" />
      </Stack>
    </Wrap>
  )
}

```

## Installation

Use the Park UI CLI to add the Skeleton component to your project:

```bash
npx @park-ui/cli add skeleton
```

## Usage

```tsx
import { Skeleton, SkeletonCircle, SkeletonText } from "@/components/ui"
```

```tsx
<Stack gap="6">
  <HStack>
    <SkeletonCircle boxSize="10" />
    <SkeletonText noOfLines={2} />
  </HStack>
  <Skeleton height="48" />
</Stack>
```

## Examples

### Text

Use the `SkeletonText` component to create a skeleton for text.

```tsx
import { SkeletonText } from '@/components/ui'

export const App = () => {
  return <SkeletonText noOfLines={3} gap="3" />
}

```

### Variants

Use the `variant` prop to change the visual style of the Skeleton.

```tsx
import { Stack } from 'styled-system/jsx'
import { Skeleton, Text } from '@/components/ui'

export const App = () => {
  return (
    <Stack gap="4">
      <Stack gap="1.5">
        <Text textStyle="label">Pulse</Text>
        <Skeleton flex="1" minH="5" variant="pulse" />
      </Stack>
      <Stack gap="1.5">
        <Text textStyle="label">Shine</Text>
        <Skeleton flex="1" minH="5" variant="shine" />
      </Stack>
    </Stack>
  )
}

```

### Feed

Use the `Skeleton` component to create a feed skeleton.

```tsx
import { HStack, Stack } from 'styled-system/jsx'
import { Skeleton, SkeletonCircle, SkeletonText } from '@/components/ui'

export const App = () => {
  return (
    <Stack gap="6">
      <HStack width="full">
        <SkeletonCircle boxSize="10" />
        <SkeletonText noOfLines={2} />
      </HStack>
      <Skeleton height="200px" />
    </Stack>
  )
}

```

### Content Loading

When `loading` is changed to `false`, the Skeleton component will fade in.

```tsx
'use client'
import { useState } from 'react'
import { Stack } from 'styled-system/jsx'
import { Button, Skeleton, Text } from '@/components/ui'

export const App = () => {
  const [loading, setLoading] = useState(true)

  return (
    <Stack align="flex-start" gap="4">
      <Skeleton loading={loading}>
        <Text>Park UI rocks 🚀</Text>
      </Skeleton>
      <Button variant="surface" onClick={() => setLoading((c) => !c)}>
        Toggle
      </Button>
    </Stack>
  )
}

```

### Custom Colors

Use the `--start-color` and `--end-color` CSS variables to change the start and end color of the skeleton.

```tsx
import { Skeleton } from '@/components/ui'

export const App = () => {
  return (
    <Skeleton
      variant="shine"
      width="full"
      height="5"
      css={{
        '--start-color': 'colors.pink.5',
        '--end-color': 'colors.blue.5',
      }}
    />
  )
}

```

## Props

| Prop | Default | Type |
| --- | --- | --- |
| `loading` | true | `boolean` |
| `variant` | 'pulse' | `'pulse' | 'shine' | 'none'` |
| `circle` | - | `boolean` |

# Spinner

A feedback component for indicating loading or processing states.

```tsx
import { Spinner } from '@/components/ui'

export const App = () => {
  return <Spinner />
}

```

## Installation

Use the Park UI CLI to add the Spinner component to your project:

```bash
npx @park-ui/cli add spinner
```

## Usage

```tsx
import { Spinner } from '@/components/ui'
```

```tsx
<Spinner />
```

## Examples

### Sizes

Use the `size` prop to change the size of the spinner.

```tsx
import { Wrap } from 'styled-system/jsx'
import { Spinner } from '@/components/ui'

export const App = () => {
  return (
    <Wrap gap="4">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
      <Spinner size="2xl" />
    </Wrap>
  )
}

```

### Colors

Use the `colorPalette` prop to change the color scheme of the spinner.

```tsx
import { Wrap } from 'styled-system/jsx'
import { Spinner } from '@/components/ui'

export const App = () => {
  return (
    <Wrap gap="4">
      <Spinner color="colorPalette.9" colorPalette="red" />
      <Spinner color="colorPalette.9" colorPalette="green" />
      <Spinner color="colorPalette.9" colorPalette="blue" />
      <Spinner color="colorPalette.9" colorPalette="amber" />
    </Wrap>
  )
}

```

### Track Color

Use the `--spinner-track-color` variable to change the color of the spinner's track.

```tsx
import { Spinner } from '@/components/ui'

export const App = () => {
  return <Spinner css={{ '--spinner-track-color': 'colors.gray.subtle.bg' }} />
}

```

### Speed

Use the `animationDuration` prop to change the speed of the spinner.

```tsx
import { Spinner } from '@/components/ui'

export const App = () => {
  return <Spinner animationDuration=".8s" />
}

```

### Thickness

Use the `borderWidth` prop to change the thickness of the spinner.

```tsx
import { Spinner } from '@/components/ui'

export const App = () => {
  return <Spinner borderWidth="4px" />
}

```

### Label

Compose the spinner with a label to provide additional context.

```tsx
import { VStack } from 'styled-system/jsx'
import { Spinner, Text } from '@/components/ui'

export const App = () => {
  return (
    <VStack gap="1.5">
      <Spinner />
      <Text color="fg.muted">Loading Users ...</Text>
    </VStack>
  )
}

```

## Props

| Prop | Default | Type |
| --- | --- | --- |
| `size` | 'md' | `'inherit' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'` |

# Toast

A feedback component for displaying temporary notification messages.

```tsx
'use client'
import { Button, toaster } from '@/components/ui'

export const App = () => {
  return (
    <div>
      <Button
        variant="outline"
        onClick={() =>
          toaster.create({
            title: 'Title',
            description: 'Description',
          })
        }
      >
        Add Toast
      </Button>
    </div>
  )
}

```

## Installation

Use the Park UI CLI to add the Toast component to your project:

```bash
npx @park-ui/cli add toast
```

## Usage

```tsx
import { Toaster, toaster } from "@/components/ui"
```

First, render the `Toaster` component in the root of your application.

```tsx
<Toaster />
```

Then, create a toast by calling the `toaster` function.

```tsx
toaster.create({
  title: "Toast Title",
  description: "Toast Description",
})
```

## Examples

### Closable 

Set the `closable` prop to `true` to create a closable toast.

```tsx
'use client'
import { Button, toaster } from '@/components/ui'

export const App = () => {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toaster.create({
          title: 'Title',
          description: 'Description',
          closable: true,
        })
      }
    >
      Add Toast
    </Button>
  )
}

```

### External Close

Use the `toaster.dismiss` method to close a toast.

- `toaster.dismiss(id)`: Dismiss a toast by its id.
- `toaster.dismiss()`: Dismiss all toasts.


```tsx
'use client'
import { Wrap } from 'styled-system/jsx'
import { Button, toaster } from '@/components/ui'

export const App = () => {
  return (
    <Wrap gap="4">
      <Button
        variant="outline"
        onClick={() =>
          toaster.create({
            title: 'Title',
            description: 'Description',
          })
        }
      >
        Add Toast
      </Button>
      <Button variant="outline" onClick={() => toaster.dismiss()}>
        Close Toasts
      </Button>
    </Wrap>
  )
}

```

### Types

Here's an example of each type of toast.

```tsx
'use client'
import { Wrap } from 'styled-system/jsx'
import { Button, toaster } from '@/components/ui'

export const App = () => {
  const types = ['success', 'error', 'warning', 'info'] as const

  return (
    <Wrap gap="4">
      {types.map((type) => (
        <Button
          variant="outline"
          key={type}
          onClick={() =>
            toaster.create({
              title: `Toast status is ${type}`,
              type: type,
              duration: 40000,
            })
          }
        >
          {type}
        </Button>
      ))}
    </Wrap>
  )
}

```

### With Action

Use the `action` and `actionLabel` prop to add an action to the toast.

> When the action trigger is clicked, the toast will be closed.

```tsx
'use client'
import { Button, toaster } from '@/components/ui'

export const App = () => {
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() =>
        toaster.create({
          title: 'Title',
          description: 'Description',
          action: {
            label: 'Action',
            onClick: () =>
              toaster.success({
                title: 'Action',
                description: 'You clicked the action button',
              }),
          },
        })
      }
    >
      Add Toast
    </Button>
  )
}

```

### Promise

Use the `toaster.promise` to create a toast that resolves when the promise is resolved.

Next, you can define the toast options (title, description, etc.) for each state of the promise.

```tsx
'use client'
import { Button, toaster } from '@/components/ui'

export const App = () => {
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => {
        const fileUploadTask = new Promise<void>((resolve) => {
          setTimeout(() => resolve(), 2000)
        })

        toaster.promise(fileUploadTask, {
          success: {
            title: 'Successfully uploaded!',
            description: 'Looks great',
          },
          error: {
            title: 'Upload failed',
            description: 'Something wrong with the upload',
          },
          loading: { title: 'Uploading...', description: 'Please wait' },
        })
      }}
    >
      Add Toast
    </Button>
  )
}

```

### Custom Duration

Use the `duration` prop to set the duration of the toast.

```tsx
'use client'
import { Button, toaster } from '@/components/ui'

export const App = () => {
  return (
    <div>
      <Button
        variant="outline"
        onClick={() =>
          toaster.create({
            title: 'Title',
            description: 'Description',
            duration: 6000,
          })
        }
      >
        Add Toast
      </Button>
    </div>
  )
}

```

### Maximum Visible Toasts

Set the `max` prop on the `createToaster` function to define the maximum number of toasts that can be rendered at any one time.
Any extra toasts will be queued and rendered when a toast has been dismissed.

```tsx
const toaster = createToaster({
  max: 3,
})
```

### Placement

Toasts can be displayed on all four corners of a page. We recommend picking one desired position and configure it in the `createToaster` function.

```tsx
const toaster = createToaster({
  placement: "top-end",
})

```
### Stacked Toasts

By default, toasts overlap each other. To make the toasts stack on top of each other, set the `overlap` prop to `false` in the `createToaster` function.

```tsx
const toaster = createToaster({
  placement: "top-end",
  overlap: false,
})
```

### Page Idle Behavior

Pause toast timers when the page is idle/hidden.

```tsx
const toaster = createToaster({
  pauseOnPageIdle: true,
})
```

### Offset

Set the `offsets` prop in the `createToaster` function to offset the toasts from the edges of the screen.

```tsx
const toaster = createToaster({
  offsets: "20px",
})
```

Alternatively, you can use the `offsets` prop to set the offset for each edge of the screen.

```tsx
const toaster = createToaster({
  offsets: { left: "20px", top: "20px", right: "20px", bottom: "20px" },
})
```

## Props

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

# Checkbox

A form input component for toggling between checked and unchecked states.

```tsx
import { Checkbox } from '@/components/ui'

export const App = () => {
  return (
    <Checkbox.Root defaultChecked>
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>Label</Checkbox.Label>
    </Checkbox.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Checkbox component to your project:

```bash
npx @park-ui/cli add checkbox
```

## Usage

```tsx
import { Checkbox } from '@/components/ui'
```

```tsx
<Checkbox.Root>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label />
</Checkbox.Root>
```

:::info

If you prefer a closed component composition, check out the [snippet below](#closed-component).

:::


## Examples

### Variants

Customize the appearance with different visual styles to match your design:

```tsx
import { Stack } from 'styled-system/jsx'
import { Checkbox } from '@/components/ui'

export const App = () => {
  const variants = ['solid', 'surface', 'subtle', 'outline', 'plain'] as const
  return (
    <Stack gap="4" alignItems="start">
      {variants.map((variant) => (
        <Checkbox.Root variant={variant} key={variant} defaultChecked>
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>Label</Checkbox.Label>
        </Checkbox.Root>
      ))}
    </Stack>
  )
}

```

### Colors

Use the `colorPalette` prop to change the color of the checkbox:

```tsx
import { Stack } from 'styled-system/jsx'
import { Checkbox } from '@/components/ui'

export const App = () => {
  const colors = ['blue', 'green', 'amber', 'red'] as const

  return (
    <Stack gap="4" alignItems="start">
      {colors.map((color) => (
        <Checkbox.Root colorPalette={color} key={color} defaultChecked>
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>Label</Checkbox.Label>
        </Checkbox.Root>
      ))}
    </Stack>
  )
}

```

### Sizes

Adjust the size to match surrounding text or interface elements:

```tsx
import { Stack } from 'styled-system/jsx'
import { Checkbox } from '@/components/ui'

export const App = () => {
  const sizes = ['sm', 'md', 'lg'] as const
  return (
    <Stack gap="4" alignItems="start">
      {sizes.map((size) => (
        <Checkbox.Root size={size} key={size} defaultChecked>
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>Label</Checkbox.Label>
        </Checkbox.Root>
      ))}
    </Stack>
  )
}

```

### States

Pass the `disabled` or `invalid` prop to the `Checkbox.Root` component to change the visual state of the checkbox.

```tsx
import { Stack } from 'styled-system/jsx'
import { Checkbox } from '@/components/ui'

export const App = () => {
  return (
    <Stack gap="4" alignItems="start">
      <Checkbox.Root disabled>
        <Checkbox.HiddenInput />
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label>Disabled</Checkbox.Label>
      </Checkbox.Root>

      <Checkbox.Root defaultChecked disabled>
        <Checkbox.HiddenInput />
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label>Disabled</Checkbox.Label>
      </Checkbox.Root>

      <Checkbox.Root readOnly>
        <Checkbox.HiddenInput />
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label>Readonly</Checkbox.Label>
      </Checkbox.Root>

      <Checkbox.Root invalid>
        <Checkbox.HiddenInput />
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label>Invalid</Checkbox.Label>
      </Checkbox.Root>
    </Stack>
  )
}

```

### Controlled

Use the `checked` and `onCheckedChange` props to control the checkbox state.

```tsx
'use client'
import { useState } from 'react'
import { Checkbox } from '@/components/ui'

export const App = () => {
  const [checked, setChecked] = useState<Checkbox.CheckedState>(false)

  return (
    <Checkbox.Root checked={checked} onCheckedChange={(e) => setChecked(e.checked)}>
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>Label</Checkbox.Label>
    </Checkbox.Root>
  )
}

```

### Label

Here's an example of how to change the label position to the left:

```tsx
import { Checkbox } from '@/components/ui'

export const App = () => {
  return (
    <Checkbox.Root>
      <Checkbox.HiddenInput />
      <Checkbox.Label>Label</Checkbox.Label>
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
    </Checkbox.Root>
  )
}

```

### Indeterminate

Set the `checked` prop to `indeterminate` to show the checkbox in an indeterminate state.

```tsx
'use client'
import { useState } from 'react'
import { Stack } from 'styled-system/jsx'
import { Checkbox } from '@/components/ui'

export const App = () => {
  const initialValues = [
    { label: 'Monday', checked: false, value: 'monday' },
    { label: 'Tuesday', checked: false, value: 'tuesday' },
    { label: 'Wednesday', checked: false, value: 'wednesday' },
    { label: 'Thursday', checked: false, value: 'thursday' },
  ]
  const [values, setValues] = useState(initialValues)

  const allChecked = values.every((value) => value.checked)
  const indeterminate = values.some((value) => value.checked) && !allChecked

  return (
    <Stack gap="4" alignItems="start">
      <Checkbox.Root
        checked={indeterminate ? 'indeterminate' : allChecked}
        onCheckedChange={(e) => {
          setValues((current) => current.map((value) => ({ ...value, checked: !!e.checked })))
        }}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label>Weekdays</Checkbox.Label>
      </Checkbox.Root>
      {values.map((item, index) => (
        <Checkbox.Root
          ms="6"
          key={item.value}
          checked={item.checked}
          onCheckedChange={(e) =>
            setValues((current) => {
              const newValues = [...current]
              if (!newValues[index]) return newValues
              newValues[index] = { ...newValues[index], checked: !!e.checked }
              return newValues
            })
          }
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label> {item.label}</Checkbox.Label>
        </Checkbox.Root>
      ))}
    </Stack>
  )
}

```

### Description

Here's an example of how to add some further description to the checkbox:

```tsx
import { Stack } from 'styled-system/jsx'
import { Checkbox, Text } from '@/components/ui'

export const App = () => {
  return (
    <Checkbox.Root alignItems="flex-start">
      <Checkbox.HiddenInput />
      <Checkbox.Control mt="0.5">
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Stack gap="0">
        <Checkbox.Label>I agree to the terms and conditions</Checkbox.Label>
        <Text>By clicking this, you agree to our Terms and Privacy Policy.</Text>
      </Stack>
    </Checkbox.Root>
  )
}

```

### Link

Render an anchor tag within the `Checkbox.Label` to add a link to the label.

```tsx
import { Checkbox, Link } from '@/components/ui'

export const App = () => {
  return (
    <Checkbox.Root>
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>
        I agree to the{' '}
        <Link href="https:/park-ui.com" target="_blank">
          terms and conditions
        </Link>
      </Checkbox.Label>
    </Checkbox.Root>
  )
}

```

### Closed Component

Here's how to setup the avatar for a closed component composition.

```tsx
import { forwardRef } from 'react'
import { VisuallyHidden } from 'styled-system/jsx'
import { Checkbox as StyledCheckbox } from '@/components/ui'

export type { CheckboxCheckedState } from '@ark-ui/react/checkbox'

export interface CheckboxProps extends StyledCheckbox.RootProps {
  inputProps?: StyledCheckbox.HiddenInputProps
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, ref) {
  const { children, inputProps, ...rootProps } = props
  return (
    <StyledCheckbox.Root {...rootProps}>
      <StyledCheckbox.HiddenInput ref={ref} {...inputProps} />
      <StyledCheckbox.Control>
        <StyledCheckbox.Indicator />
      </StyledCheckbox.Control>
      {children && <StyledCheckbox.Label>{children}</StyledCheckbox.Label>}
      {props['aria-label'] && (
        <StyledCheckbox.Label asChild>
          <VisuallyHidden>{props['aria-label']}</VisuallyHidden>
        </StyledCheckbox.Label>
      )}
    </StyledCheckbox.Root>
  )
})

```

To use the closed component, simply import and use it like this:

```tsx
<Checkbox>Label</Checkbox>
```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `size` | 'md' | `'sm' | 'md' | 'lg'` |
| `variant` | 'solid' | `'solid' | 'surface' | 'subtle' | 'outline' | 'plain'` |
| `value` | \on\ | `string`<br/>The value of checkbox input. Useful for form submission. |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `checked` | - | `CheckedState`<br/>The controlled checked state of the checkbox |
| `defaultChecked` | - | `CheckedState`<br/>The initial checked state of the checkbox when rendered.
Use when you don't need to control the checked state of the checkbox. |
| `disabled` | - | `boolean`<br/>Whether the checkbox is disabled |
| `form` | - | `string`<br/>The id of the form that the checkbox belongs to. |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{ root: string; hiddenInput: string; control: string; label: string }>`<br/>The ids of the elements in the checkbox. Useful for composition. |
| `invalid` | - | `boolean`<br/>Whether the checkbox is invalid |
| `name` | - | `string`<br/>The name of the input field in a checkbox.
Useful for form submission. |
| `onCheckedChange` | - | `(details: CheckedChangeDetails) => void`<br/>The callback invoked when the checked state changes. |
| `readOnly` | - | `boolean`<br/>Whether the checkbox is read-only |
| `required` | - | `boolean`<br/>Whether the checkbox is required |

### Group

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `defaultValue` | - | `string[]`<br/>The initial value of `value` when uncontrolled |
| `disabled` | - | `boolean`<br/>If `true`, the checkbox group is disabled |
| `invalid` | - | `boolean`<br/>If `true`, the checkbox group is invalid |
| `name` | - | `string`<br/>The name of the input fields in the checkbox group
(Useful for form submission). |
| `onValueChange` | - | `(value: string[]) => void`<br/>The callback to call when the value changes |
| `readOnly` | - | `boolean`<br/>If `true`, the checkbox group is read-only |
| `value` | - | `string[]`<br/>The controlled value of the checkbox group |

### GroupProvider

| Prop | Default | Type |
| --- | --- | --- |
| `value`* | - | `UseCheckboxGroupContext` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

### Indicator

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `indeterminate` | - | `boolean` |

# Color Picker (WIP)

An input component for selecting and manipulating color values.

```tsx
'use client'
import { parseColor } from '@ark-ui/react/color-picker'
import { ColorPicker } from '@/components/ui'

export const App = () => {
  return (
    <ColorPicker.Root defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.ChannelInput channel="alpha" />
        <ColorPicker.ValueText />
        <ColorPicker.Trigger>
          <ColorPicker.TransparencyGrid />
          <ColorPicker.ValueSwatch />
        </ColorPicker.Trigger>
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.FormatTrigger>Toggle ColorFormat</ColorPicker.FormatTrigger>
          <ColorPicker.FormatSelect />
          <ColorPicker.Area>
            <ColorPicker.AreaBackground />
            <ColorPicker.AreaThumb />
          </ColorPicker.Area>
          <ColorPicker.ChannelSlider channel="hue">
            <ColorPicker.ChannelSliderTrack />
            <ColorPicker.ChannelSliderThumb />
          </ColorPicker.ChannelSlider>
          <ColorPicker.ChannelSlider channel="alpha">
            <ColorPicker.TransparencyGrid />
            <ColorPicker.ChannelSliderTrack />
            <ColorPicker.ChannelSliderThumb />
          </ColorPicker.ChannelSlider>
          <ColorPicker.SwatchGroup>
            <ColorPicker.SwatchTrigger value="red">
              <ColorPicker.Swatch value="red">
                <ColorPicker.SwatchIndicator>✓</ColorPicker.SwatchIndicator>
              </ColorPicker.Swatch>
            </ColorPicker.SwatchTrigger>
            <ColorPicker.SwatchTrigger value="blue">
              <ColorPicker.Swatch value="blue">
                <ColorPicker.SwatchIndicator>✓</ColorPicker.SwatchIndicator>
              </ColorPicker.Swatch>
            </ColorPicker.SwatchTrigger>
            <ColorPicker.SwatchTrigger value="green">
              <ColorPicker.Swatch value="green">
                <ColorPicker.SwatchIndicator>✓</ColorPicker.SwatchIndicator>
              </ColorPicker.Swatch>
            </ColorPicker.SwatchTrigger>
          </ColorPicker.SwatchGroup>
          <ColorPicker.View format="rgba">
            <ColorPicker.ChannelInput channel="hex" />
            <ColorPicker.ChannelInput channel="alpha" />
          </ColorPicker.View>
          <ColorPicker.View format="hsla">
            <ColorPicker.ChannelInput channel="hue" />
            <ColorPicker.ChannelInput channel="saturation" />
            <ColorPicker.ChannelInput channel="lightness" />
          </ColorPicker.View>
          <ColorPicker.EyeDropperTrigger>Pick color</ColorPicker.EyeDropperTrigger>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Color-picker component to your project:

```bash
npx @park-ui/cli add color-picker
```

## Usage

```tsx
import { ColorPicker } from '@/components/ui'
```

```tsx
<ColorPicker.Root>
  <ColorPicker.Control>
    <ColorPicker.ChannelInput channel="hex" />
    <ColorPicker.Trigger>
      <ColorPicker.Swatch value="#000000" />
    </ColorPicker.Trigger>
  </ColorPicker.Control>
</ColorPicker.Root>
```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `closeOnSelect` | false | `boolean`<br/>Whether to close the color picker when a swatch is selected |
| `defaultFormat` | \rgba\ | `ColorFormat`<br/>The initial color format when rendered.
Use when you don't need to control the color format of the color picker. |
| `defaultValue` | #000000 | `Color`<br/>The initial color value when rendered.
Use when you don't need to control the color value of the color picker. |
| `lazyMount` | false | `boolean`<br/>Whether to enable lazy mounting |
| `openAutoFocus` | true | `boolean`<br/>Whether to auto focus the color picker when it is opened |
| `skipAnimationOnMount` | false | `boolean`<br/>Whether to allow the initial presence animation. |
| `unmountOnExit` | false | `boolean`<br/>Whether to unmount on exit. |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `defaultOpen` | - | `boolean`<br/>The initial open state of the color picker when rendered.
Use when you don't need to control the open state of the color picker. |
| `disabled` | - | `boolean`<br/>Whether the color picker is disabled |
| `format` | - | `ColorFormat`<br/>The controlled color format to use |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{ root: string; control: string; trigger: string; label: string; input: string; hiddenInput: string; content: string; area: string; areaGradient: string; positioner: string; formatSelect: string; areaThumb: string; channelInput: (id: string) => string; channelSliderTrack: (id: ColorChannel) => string; channe...`<br/>The ids of the elements in the color picker. Useful for composition. |
| `immediate` | - | `boolean`<br/>Whether to synchronize the present change immediately or defer it to the next frame |
| `initialFocusEl` | - | `() => HTMLElement | null`<br/>The initial focus element when the color picker is opened. |
| `inline` | - | `boolean`<br/>Whether to render the color picker inline |
| `invalid` | - | `boolean`<br/>Whether the color picker is invalid |
| `name` | - | `string`<br/>The name for the form input |
| `onExitComplete` | - | `VoidFunction`<br/>Function called when the animation ends in the closed state |
| `onFocusOutside` | - | `(event: FocusOutsideEvent) => void`<br/>Function called when the focus is moved outside the component |
| `onFormatChange` | - | `(details: FormatChangeDetails) => void`<br/>Function called when the color format changes |
| `onInteractOutside` | - | `(event: InteractOutsideEvent) => void`<br/>Function called when an interaction happens outside the component |
| `onOpenChange` | - | `(details: OpenChangeDetails) => void`<br/>Handler that is called when the user opens or closes the color picker. |
| `onPointerDownOutside` | - | `(event: PointerDownOutsideEvent) => void`<br/>Function called when the pointer is pressed down outside the component |
| `onValueChange` | - | `(details: ValueChangeDetails) => void`<br/>Handler that is called when the value changes, as the user drags. |
| `onValueChangeEnd` | - | `(details: ValueChangeDetails) => void`<br/>Handler that is called when the user stops dragging. |
| `open` | - | `boolean`<br/>The controlled open state of the color picker |
| `positioning` | - | `PositioningOptions`<br/>The positioning options for the color picker |
| `present` | - | `boolean`<br/>Whether the node is present (controlled by the user) |
| `readOnly` | - | `boolean`<br/>Whether the color picker is read-only |
| `required` | - | `boolean`<br/>Whether the color picker is required |
| `value` | - | `Color`<br/>The controlled color value of the color picker |

### Area

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `xChannel` | - | `ColorChannel` |
| `yChannel` | - | `ColorChannel` |

### ChannelInput

| Prop | Default | Type |
| --- | --- | --- |
| `channel`* | - | `ExtendedColorChannel` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `orientation` | - | `Orientation` |

### ChannelSlider

| Prop | Default | Type |
| --- | --- | --- |
| `channel`* | - | `ColorChannel` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `orientation` | - | `Orientation` |

### Swatch

| Prop | Default | Type |
| --- | --- | --- |
| `value`* | - | `string | Color`<br/>The color value |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `respectAlpha` | - | `boolean`<br/>Whether to include the alpha channel in the color |

### SwatchTrigger

| Prop | Default | Type |
| --- | --- | --- |
| `value`* | - | `string | Color`<br/>The color value |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `disabled` | - | `boolean`<br/>Whether the swatch trigger is disabled |

### TransparencyGrid

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `size` | - | `string` |

### ValueSwatch

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `respectAlpha` | - | `boolean`<br/>Whether to include the alpha channel in the color |

### ValueText

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `format` | - | `ColorStringFormat` |

### View

| Prop | Default | Type |
| --- | --- | --- |
| `format`* | - | `ColorFormat` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

# Color Picker (WIP)

An input component for selecting and manipulating color values.

```tsx
'use client'
import { parseColor } from '@ark-ui/react/color-picker'
import { ColorPicker } from '@/components/ui'

export const App = () => {
  return (
    <ColorPicker.Root defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.ChannelInput channel="alpha" />
        <ColorPicker.ValueText />
        <ColorPicker.Trigger>
          <ColorPicker.TransparencyGrid />
          <ColorPicker.ValueSwatch />
        </ColorPicker.Trigger>
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.FormatTrigger>Toggle ColorFormat</ColorPicker.FormatTrigger>
          <ColorPicker.FormatSelect />
          <ColorPicker.Area>
            <ColorPicker.AreaBackground />
            <ColorPicker.AreaThumb />
          </ColorPicker.Area>
          <ColorPicker.ChannelSlider channel="hue">
            <ColorPicker.ChannelSliderTrack />
            <ColorPicker.ChannelSliderThumb />
          </ColorPicker.ChannelSlider>
          <ColorPicker.ChannelSlider channel="alpha">
            <ColorPicker.TransparencyGrid />
            <ColorPicker.ChannelSliderTrack />
            <ColorPicker.ChannelSliderThumb />
          </ColorPicker.ChannelSlider>
          <ColorPicker.SwatchGroup>
            <ColorPicker.SwatchTrigger value="red">
              <ColorPicker.Swatch value="red">
                <ColorPicker.SwatchIndicator>✓</ColorPicker.SwatchIndicator>
              </ColorPicker.Swatch>
            </ColorPicker.SwatchTrigger>
            <ColorPicker.SwatchTrigger value="blue">
              <ColorPicker.Swatch value="blue">
                <ColorPicker.SwatchIndicator>✓</ColorPicker.SwatchIndicator>
              </ColorPicker.Swatch>
            </ColorPicker.SwatchTrigger>
            <ColorPicker.SwatchTrigger value="green">
              <ColorPicker.Swatch value="green">
                <ColorPicker.SwatchIndicator>✓</ColorPicker.SwatchIndicator>
              </ColorPicker.Swatch>
            </ColorPicker.SwatchTrigger>
          </ColorPicker.SwatchGroup>
          <ColorPicker.View format="rgba">
            <ColorPicker.ChannelInput channel="hex" />
            <ColorPicker.ChannelInput channel="alpha" />
          </ColorPicker.View>
          <ColorPicker.View format="hsla">
            <ColorPicker.ChannelInput channel="hue" />
            <ColorPicker.ChannelInput channel="saturation" />
            <ColorPicker.ChannelInput channel="lightness" />
          </ColorPicker.View>
          <ColorPicker.EyeDropperTrigger>Pick color</ColorPicker.EyeDropperTrigger>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Color-picker component to your project:

```bash
npx @park-ui/cli add color-picker
```

## Usage

```tsx
import { ColorPicker } from '@/components/ui'
```

```tsx
<ColorPicker.Root>
  <ColorPicker.Control>
    <ColorPicker.ChannelInput channel="hex" />
    <ColorPicker.Trigger>
      <ColorPicker.Swatch value="#000000" />
    </ColorPicker.Trigger>
  </ColorPicker.Control>
</ColorPicker.Root>
```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `closeOnSelect` | false | `boolean`<br/>Whether to close the color picker when a swatch is selected |
| `defaultFormat` | \rgba\ | `ColorFormat`<br/>The initial color format when rendered.
Use when you don't need to control the color format of the color picker. |
| `defaultValue` | #000000 | `Color`<br/>The initial color value when rendered.
Use when you don't need to control the color value of the color picker. |
| `lazyMount` | false | `boolean`<br/>Whether to enable lazy mounting |
| `openAutoFocus` | true | `boolean`<br/>Whether to auto focus the color picker when it is opened |
| `skipAnimationOnMount` | false | `boolean`<br/>Whether to allow the initial presence animation. |
| `unmountOnExit` | false | `boolean`<br/>Whether to unmount on exit. |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `defaultOpen` | - | `boolean`<br/>The initial open state of the color picker when rendered.
Use when you don't need to control the open state of the color picker. |
| `disabled` | - | `boolean`<br/>Whether the color picker is disabled |
| `format` | - | `ColorFormat`<br/>The controlled color format to use |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{ root: string; control: string; trigger: string; label: string; input: string; hiddenInput: string; content: string; area: string; areaGradient: string; positioner: string; formatSelect: string; areaThumb: string; channelInput: (id: string) => string; channelSliderTrack: (id: ColorChannel) => string; channe...`<br/>The ids of the elements in the color picker. Useful for composition. |
| `immediate` | - | `boolean`<br/>Whether to synchronize the present change immediately or defer it to the next frame |
| `initialFocusEl` | - | `() => HTMLElement | null`<br/>The initial focus element when the color picker is opened. |
| `inline` | - | `boolean`<br/>Whether to render the color picker inline |
| `invalid` | - | `boolean`<br/>Whether the color picker is invalid |
| `name` | - | `string`<br/>The name for the form input |
| `onExitComplete` | - | `VoidFunction`<br/>Function called when the animation ends in the closed state |
| `onFocusOutside` | - | `(event: FocusOutsideEvent) => void`<br/>Function called when the focus is moved outside the component |
| `onFormatChange` | - | `(details: FormatChangeDetails) => void`<br/>Function called when the color format changes |
| `onInteractOutside` | - | `(event: InteractOutsideEvent) => void`<br/>Function called when an interaction happens outside the component |
| `onOpenChange` | - | `(details: OpenChangeDetails) => void`<br/>Handler that is called when the user opens or closes the color picker. |
| `onPointerDownOutside` | - | `(event: PointerDownOutsideEvent) => void`<br/>Function called when the pointer is pressed down outside the component |
| `onValueChange` | - | `(details: ValueChangeDetails) => void`<br/>Handler that is called when the value changes, as the user drags. |
| `onValueChangeEnd` | - | `(details: ValueChangeDetails) => void`<br/>Handler that is called when the user stops dragging. |
| `open` | - | `boolean`<br/>The controlled open state of the color picker |
| `positioning` | - | `PositioningOptions`<br/>The positioning options for the color picker |
| `present` | - | `boolean`<br/>Whether the node is present (controlled by the user) |
| `readOnly` | - | `boolean`<br/>Whether the color picker is read-only |
| `required` | - | `boolean`<br/>Whether the color picker is required |
| `value` | - | `Color`<br/>The controlled color value of the color picker |

### Area

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `xChannel` | - | `ColorChannel` |
| `yChannel` | - | `ColorChannel` |

### ChannelInput

| Prop | Default | Type |
| --- | --- | --- |
| `channel`* | - | `ExtendedColorChannel` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `orientation` | - | `Orientation` |

### ChannelSlider

| Prop | Default | Type |
| --- | --- | --- |
| `channel`* | - | `ColorChannel` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `orientation` | - | `Orientation` |

### Swatch

| Prop | Default | Type |
| --- | --- | --- |
| `value`* | - | `string | Color`<br/>The color value |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `respectAlpha` | - | `boolean`<br/>Whether to include the alpha channel in the color |

### SwatchTrigger

| Prop | Default | Type |
| --- | --- | --- |
| `value`* | - | `string | Color`<br/>The color value |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `disabled` | - | `boolean`<br/>Whether the swatch trigger is disabled |

### TransparencyGrid

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `size` | - | `string` |

### ValueSwatch

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `respectAlpha` | - | `boolean`<br/>Whether to include the alpha channel in the color |

### ValueText

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `format` | - | `ColorStringFormat` |

### View

| Prop | Default | Type |
| --- | --- | --- |
| `format`* | - | `ColorFormat` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

# Date Picker (WIP)

An input component for selecting dates with a calendar interface.

```tsx
'use client'
import { Portal } from '@ark-ui/react/portal'
import { DatePicker } from '@/components/ui'

export const App = () => {
  return (
    <DatePicker.Root>
      <DatePicker.Label>Select Date</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input placeholder="Select a date" />
        <DatePicker.Trigger>📅</DatePicker.Trigger>
        <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Context>
                {(datePicker) => (
                  <>
                    <DatePicker.ViewControl>
                      <DatePicker.PrevTrigger>‹</DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger>
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger>›</DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table>
                      <DatePicker.TableHead>
                        <DatePicker.TableRow>
                          {datePicker.weekDays.map((weekDay, id) => (
                            <DatePicker.TableHeader key={id}>
                              {weekDay.short}
                            </DatePicker.TableHeader>
                          ))}
                        </DatePicker.TableRow>
                      </DatePicker.TableHead>
                      <DatePicker.TableBody>
                        {datePicker.weeks.map((week, id) => (
                          <DatePicker.TableRow key={id}>
                            {week.map((day, id) => (
                              <DatePicker.TableCell key={id} value={day}>
                                <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            ))}
                          </DatePicker.TableRow>
                        ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Context>
                {(datePicker) => (
                  <>
                    <DatePicker.ViewControl>
                      <DatePicker.PrevTrigger>‹</DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger>
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger>›</DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table>
                      <DatePicker.TableBody>
                        {datePicker
                          .getMonthsGrid({ columns: 4, format: 'short' })
                          .map((months, id: number) => (
                            <DatePicker.TableRow key={id}>
                              {months.map((month, id: number) => (
                                <DatePicker.TableCell key={id} value={month.value}>
                                  <DatePicker.TableCellTrigger>
                                    {month.label}
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              ))}
                            </DatePicker.TableRow>
                          ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Context>
                {(datePicker) => (
                  <>
                    <DatePicker.ViewControl>
                      <DatePicker.PrevTrigger>‹</DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger>
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger>›</DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table>
                      <DatePicker.TableBody>
                        {datePicker.getYearsGrid({ columns: 4 }).map((years, id: number) => (
                          <DatePicker.TableRow key={id}>
                            {years.map((year, id: number) => (
                              <DatePicker.TableCell key={id} value={year.value}>
                                <DatePicker.TableCellTrigger>
                                  {year.label}
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            ))}
                          </DatePicker.TableRow>
                        ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Date-picker component to your project:

```bash
npx @park-ui/cli add date-picker
```

## Usage

```tsx
import { DatePicker } from '@/components/ui'
```

```tsx
<DatePicker.Root>
  <DatePicker.Control>
    <DatePicker.Input />
    <DatePicker.Trigger>
      <DatePicker.ClearTrigger />
    </DatePicker.Trigger>
  </DatePicker.Control>
  <DatePicker.Positioner>
    <DatePicker.Content>
      <DatePicker.View view="day">
        <DatePicker.ViewControl>
          <DatePicker.PrevTrigger />
          <DatePicker.ViewTrigger />
          <DatePicker.NextTrigger />
        </DatePicker.ViewControl>
        <DatePicker.Table />
      </DatePicker.View>
    </DatePicker.Content>
  </DatePicker.Positioner>
</DatePicker.Root>
```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `closeOnSelect` | true | `boolean`<br/>Whether the calendar should close after the date selection is complete.
This is ignored when the selection mode is `multiple`. |
| `defaultView` | \day\ | `DateView`<br/>The default view of the calendar |
| `lazyMount` | false | `boolean`<br/>Whether to enable lazy mounting |
| `locale` | \en-US\ | `string`<br/>The locale (BCP 47 language tag) to use when formatting the date. |
| `maxView` | \year\ | `DateView`<br/>The maximum view of the calendar |
| `minView` | \day\ | `DateView`<br/>The minimum view of the calendar |
| `outsideDaySelectable` | false | `boolean`<br/>Whether day outside the visible range can be selected. |
| `selectionMode` | \single\ | `SelectionMode`<br/>The selection mode of the calendar.
- `single` - only one date can be selected
- `multiple` - multiple dates can be selected
- `range` - a range of dates can be selected |
| `skipAnimationOnMount` | false | `boolean`<br/>Whether to allow the initial presence animation. |
| `timeZone` | \UTC\ | `string`<br/>The time zone to use |
| `unmountOnExit` | false | `boolean`<br/>Whether to unmount on exit. |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `defaultFocusedValue` | - | `DateValue`<br/>The initial focused date when rendered.
Use when you don't need to control the focused date of the date picker. |
| `defaultOpen` | - | `boolean`<br/>The initial open state of the date picker when rendered.
Use when you don't need to control the open state of the date picker. |
| `defaultValue` | - | `DateValue[]`<br/>The initial selected date(s) when rendered.
Use when you don't need to control the selected date(s) of the date picker. |
| `disabled` | - | `boolean`<br/>Whether the calendar is disabled. |
| `fixedWeeks` | - | `boolean`<br/>Whether the calendar should have a fixed number of weeks.
This renders the calendar with 6 weeks instead of 5 or 6. |
| `focusedValue` | - | `DateValue`<br/>The controlled focused date. |
| `format` | - | `(date: DateValue, details: LocaleDetails) => string`<br/>The format of the date to display in the input. |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{ root: string; label: (index: number) => string; table: (id: string) => string; tableHeader: (id: string) => string; tableBody: (id: string) => string; tableRow: (id: string) => string; content: string; ... 10 more ...; positioner: string; }>`<br/>The ids of the elements in the date picker. Useful for composition. |
| `immediate` | - | `boolean`<br/>Whether to synchronize the present change immediately or defer it to the next frame |
| `inline` | - | `boolean`<br/>Whether to render the date picker inline |
| `isDateUnavailable` | - | `(date: DateValue, locale: string) => boolean`<br/>Returns whether a date of the calendar is available. |
| `max` | - | `DateValue`<br/>The maximum date that can be selected. |
| `min` | - | `DateValue`<br/>The minimum date that can be selected. |
| `name` | - | `string`<br/>The `name` attribute of the input element. |
| `numOfMonths` | - | `number`<br/>The number of months to display. |
| `onExitComplete` | - | `VoidFunction`<br/>Function called when the animation ends in the closed state |
| `onFocusChange` | - | `(details: FocusChangeDetails) => void`<br/>Function called when the focused date changes. |
| `onOpenChange` | - | `(details: OpenChangeDetails) => void`<br/>Function called when the calendar opens or closes. |
| `onValueChange` | - | `(details: ValueChangeDetails) => void`<br/>Function called when the value changes. |
| `onViewChange` | - | `(details: ViewChangeDetails) => void`<br/>Function called when the view changes. |
| `open` | - | `boolean`<br/>The controlled open state of the date picker |
| `parse` | - | `(value: string, details: LocaleDetails) => DateValue | undefined`<br/>Function to parse the date from the input back to a DateValue. |
| `placeholder` | - | `string`<br/>The placeholder text to display in the input. |
| `positioning` | - | `PositioningOptions`<br/>The user provided options used to position the date picker content |
| `present` | - | `boolean`<br/>Whether the node is present (controlled by the user) |
| `readOnly` | - | `boolean`<br/>Whether the calendar is read-only. |
| `startOfWeek` | - | `number`<br/>The first day of the week.
 `0` - Sunday
 `1` - Monday
 `2` - Tuesday
 `3` - Wednesday
 `4` - Thursday
 `5` - Friday
 `6` - Saturday |
| `translations` | - | `IntlTranslations`<br/>The localized messages to use. |
| `value` | - | `DateValue[]`<br/>The controlled selected date(s). |
| `view` | - | `DateView`<br/>The view of the calendar |

### Input

| Prop | Default | Type |
| --- | --- | --- |
| `fixOnBlur` | true | `boolean`<br/>Whether to fix the input value on blur. |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `index` | - | `number`<br/>The index of the input to focus. |

### PresetTrigger

| Prop | Default | Type |
| --- | --- | --- |
| `value`* | - | `PresetTriggerValue` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

### Table

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `columns` | - | `number` |

### TableCell

| Prop | Default | Type |
| --- | --- | --- |
| `value`* | - | `number | DateValue` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `columns` | - | `number` |
| `disabled` | - | `boolean` |
| `visibleRange` | - | `VisibleRange` |

### View

| Prop | Default | Type |
| --- | --- | --- |
| `view`* | - | `DateView` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

# Editable

A component for inline text editing with confirmation controls.

```tsx
import { Editable } from '@/components/ui'

export const App = () => {
  return (
    <Editable.Root defaultValue="Click to edit">
      <Editable.Preview />
      <Editable.Input />
    </Editable.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Editable component to your project:

```bash
npx @park-ui/cli add editable
```

## Usage

```tsx
import { Editable } from '@/components/ui'
```

```tsx
<Editable.Root>
  <Editable.Preview />
  <Editable.Input />
</Editable.Root>
```

## Examples

### Sizes

Use the `size` prop to change the size of the editable.

```tsx
import { Stack } from 'styled-system/jsx'
import { Editable } from '@/components/ui'

export const App = () => {
  const sizes = ['xs', 'sm', 'md', 'lg'] as const
  return (
    <Stack gap="4">
      {sizes.map((size) => (
        <Editable.Root key={size} defaultValue="Click to edit" size={size}>
          <Editable.Preview />
          <Editable.Input />
        </Editable.Root>
      ))}
    </Stack>
  )
}

```

### Double Click

Use the `activationMode` prop to make the content editable when users double click.

```tsx
import { Editable } from '@/components/ui'

export const App = () => {
  return (
    <Editable.Root defaultValue="Double click to edit" activationMode="dblclick">
      <Editable.Preview />
      <Editable.Input />
    </Editable.Root>
  )
}

```

### With Controls

Add controls such as "edit", "cancel" and "submit" to `Editable` for better user experience.

```tsx
import { CheckIcon, EditIcon, XIcon } from 'lucide-react'
import { ButtonGroup, Editable, IconButton } from '@/components/ui'

export const App = () => {
  return (
    <Editable.Root defaultValue="Click to edit" size="sm">
      <Editable.Preview />
      <Editable.Input />
      <Editable.Control>
        <Editable.EditTrigger asChild>
          <IconButton variant="plain" size="sm" colorPalette="gray">
            <EditIcon />
          </IconButton>
        </Editable.EditTrigger>
        <ButtonGroup variant="outline" size="sm">
          <Editable.CancelTrigger asChild>
            <IconButton colorPalette="gray">
              <XIcon />
            </IconButton>
          </Editable.CancelTrigger>
          <Editable.SubmitTrigger asChild>
            <IconButton colorPalette="gray">
              <CheckIcon />
            </IconButton>
          </Editable.SubmitTrigger>
        </ButtonGroup>
      </Editable.Control>
    </Editable.Root>
  )
}

```

### Controlled

Use the `value` and `onValueChange` props to control the editable component.

```tsx
'use client'
import { useState } from 'react'
import { Editable } from '@/components/ui'

export const App = () => {
  const [name, setName] = useState('')
  return (
    <Editable.Root value={name} onValueChange={(e) => setName(e.value)} placeholder="Click to edit">
      <Editable.Preview />
      <Editable.Input />
    </Editable.Root>
  )
}

```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `size` | 'md' | `'2xs' | 'xs' | 'sm' | 'md' | 'lg'` |
| `activationMode` | \focus\ | `ActivationMode`<br/>The activation mode for the preview element.

- "focus" - Enter edit mode when the preview is focused
- "dblclick" - Enter edit mode when the preview is double-clicked
- "click" - Enter edit mode when the preview is clicked
- "none" - Edit can be triggered programmatically only |
| `selectOnFocus` | true | `boolean`<br/>Whether to select the text in the input when it is focused. |
| `submitMode` | \both\ | `SubmitMode`<br/>The action that triggers submit in the edit mode:

- "enter" - Trigger submit when the enter key is pressed
- "blur" - Trigger submit when the editable is blurred
- "none" - No action will trigger submit. You need to use the submit button
- "both" - Pressing `Enter` and blurring the input will trigger submit |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `autoResize` | - | `boolean`<br/>Whether the editable should auto-resize to fit the content. |
| `defaultEdit` | - | `boolean`<br/>Whether the editable is in edit mode by default. |
| `defaultValue` | - | `string`<br/>The initial value of the editable when rendered.
Use when you don't need to control the value of the editable. |
| `disabled` | - | `boolean`<br/>Whether the editable is disabled. |
| `edit` | - | `boolean`<br/>Whether the editable is in edit mode. |
| `finalFocusEl` | - | `() => HTMLElement | null`<br/>The element to receive focus when the editable is closed. |
| `form` | - | `string`<br/>The associate form of the underlying input. |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{
  root: string
  area: string
  label: string
  preview: string
  input: string
  control: string
  submitTrigger: string
  cancelTrigger: string
  editTrigger: string
}>`<br/>The ids of the elements in the editable. Useful for composition. |
| `invalid` | - | `boolean`<br/>Whether the input's value is invalid. |
| `maxLength` | - | `number`<br/>The maximum number of characters allowed in the editable |
| `name` | - | `string`<br/>The name attribute of the editable component. Used for form submission. |
| `onEditChange` | - | `(details: EditChangeDetails) => void`<br/>Function to call when the edit mode changes. |
| `onFocusOutside` | - | `(event: FocusOutsideEvent) => void`<br/>Function called when the focus is moved outside the component |
| `onInteractOutside` | - | `(event: InteractOutsideEvent) => void`<br/>Function called when an interaction happens outside the component |
| `onPointerDownOutside` | - | `(event: PointerDownOutsideEvent) => void`<br/>Function called when the pointer is pressed down outside the component |
| `onValueChange` | - | `(details: ValueChangeDetails) => void`<br/>Function to call when the value changes. |
| `onValueCommit` | - | `(details: ValueChangeDetails) => void`<br/>Function to call when the value is committed. |
| `onValueRevert` | - | `(details: ValueChangeDetails) => void`<br/>Function to call when the value is reverted. |
| `placeholder` | - | `string | { edit: string; preview: string }`<br/>The placeholder text for the editable. |
| `readOnly` | - | `boolean`<br/>Whether the editable is read-only. |
| `required` | - | `boolean`<br/>Whether the editable is required. |
| `translations` | - | `IntlTranslations`<br/>The translations for the editable. |
| `value` | - | `string`<br/>The controlled value of the editable. |

# Field

A wrapper component for form inputs with labels and error messages.

```tsx
import { Field, Input } from '@/components/ui'

export const App = () => {
  return (
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <Input placeholder="Enter your email" />
    </Field.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Field component to your project:

```bash
npx @park-ui/cli add field
```

## Usage

```tsx
import { Field, Input } from '@/components/ui'
```

```tsx
<Field.Root>
  <Field.Label>
    <Field.RequiredIndicator />
  </Field.Label>
  <Input />
  <Field.HelperText />
  <Field.ErrorText />
</Field.Root>
```

## Examples

### Invalid

Pass the `invalid` prop to `Field.Root` and use the `Field.ErrorText` to indicate that the field is invalid.

```tsx
import { Field, Input } from '@/components/ui'

export const App = () => {
  return (
    <Field.Root invalid>
      <Field.Label>Email</Field.Label>
      <Input placeholder="me@example.com" />
      <Field.ErrorText>This is an error text</Field.ErrorText>
    </Field.Root>
  )
}

```

### HelperText

Use the `Field.HelperText` to add helper text to the field.

```tsx
import { Field, Input } from '@/components/ui'

export const App = () => {
  return (
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <Input placeholder="me@example.com" />
      <Field.HelperText>This is a helper text</Field.HelperText>
    </Field.Root>
  )
}

```

### Disabled

Use the `disabled` prop to disable the field.

```tsx
import { Field, Input } from '@/components/ui'

export const App = () => {
  return (
    <Field.Root disabled>
      <Field.Label>Email</Field.Label>
      <Input placeholder="Enter your email" />
      <Field.HelperText>This is a helper text</Field.HelperText>
    </Field.Root>
  )
}

```

### Required

Pass the `required` prop to `Field.Root` and use the `Field.RequiredIndicator` to indicate that the field is required.

```tsx
import { Field, Input } from '@/components/ui'

export const App = () => {
  return (
    <Field.Root required>
      <Field.Label>
        Email
        <Field.RequiredIndicator />
      </Field.Label>
      <Input placeholder="me@example.com" />
    </Field.Root>
  )
}

```

### Closed Component

Here's how to setup the field for a closed component composition.

```tsx
import { forwardRef, type ReactNode } from 'react'
import { Field as StyledField } from '@/components/ui'

export interface FieldProps extends Omit<StyledField.RootProps, 'label'> {
  label?: ReactNode
  helperText?: ReactNode
  errorText?: ReactNode
  optionalText?: ReactNode
}

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(props, ref) {
  const { label, children, helperText, errorText, optionalText, ...rest } = props
  return (
    <StyledField.Root ref={ref} {...rest}>
      {label && (
        <StyledField.Label>
          {label}
          <StyledField.RequiredIndicator fallback={optionalText} />
        </StyledField.Label>
      )}
      {children}
      {helperText && <StyledField.HelperText>{helperText}</StyledField.HelperText>}
      <StyledField.ErrorText>{errorText}</StyledField.ErrorText>
    </StyledField.Root>
  )
})

```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `disabled` | - | `boolean`<br/>Indicates whether the field is disabled. |
| `ids` | - | `ElementIds`<br/>The ids of the field parts. |
| `invalid` | - | `boolean`<br/>Indicates whether the field is invalid. |
| `readOnly` | - | `boolean`<br/>Indicates whether the field is read-only. |
| `required` | - | `boolean`<br/>Indicates whether the field is required. |

### RequiredIndicator

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `fallback` | - | `string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<...>` |

### Textarea

| Prop | Default | Type |
| --- | --- | --- |
| `autoresize` | false | `boolean`<br/>Whether the textarea should autoresize |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

# File Upload

A component for selecting and uploading files from the user's device.

```tsx
import { UploadIcon } from 'lucide-react'
import { Button, FileUpload } from '@/components/ui'

export const App = () => {
  return (
    <FileUpload.Root>
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <UploadIcon /> Upload file
        </Button>
      </FileUpload.Trigger>
      <FileUpload.List clearable showSize />
    </FileUpload.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the File-upload component to your project:

```bash
npx @park-ui/cli add file-upload
```

## Usage

```tsx
import { FileUpload } from '@/components/ui'
```

```tsx
<FileUpload.Root>
  <FileUpload.HiddenInput />
  <FileUpload.Label />
  <FileUpload.Dropzone>
    <FileUpload.DropzoneContent />
  </FileUpload.Dropzone>
  <FileUpload.Trigger />
  <FileUpload.ItemGroup>
    <FileUpload.Item>
      <FileUpload.ItemPreview />
      <FileUpload.ItemFileName />
      <FileUpload.ItemSizeText />
      <FileUpload.ItemDeleteTrigger />
    </FileUpload.Item>
  </FileUpload.ItemGroup>
</FileUpload.Root>
```

## Shortcuts

The `FileUpload` component also provides a set of shortcuts for common use cases.

### FileUpload.Items

By default, the `FileUpload.Items` shortcut renders the list of uploaded files.

```tsx
<FileUpload.ItemGroup>
  <FileUpload.Context>
    {({ acceptedFiles }) =>
      acceptedFiles.map((file) => (
        <FileUpload.Item key={file.name} file={file}>
          <FileUpload.ItemPreview />
          <FileUpload.ItemName />
          <FileUpload.ItemSizeText />
          <FileUpload.ItemDeleteTrigger />
        </FileUpload.Item>
      ))
    }
  </FileUpload.Context>
</FileUpload.ItemGroup>
```

This might be more concise if you don't need to customize the file upload items:

```tsx
<FileUpload.ItemGroup>
  <FileUpload.Items />
</FileUpload.ItemGroup>
```

### FileUpload.List

The `FileUpload.List` shortcut renders the list of uploaded files. It composes the `FileUpload.ItemGroup` and `FileUpload.Items` components.

```tsx
<FileUpload.List />
```

is the same as:

```tsx
<FileUpload.ItemGroup>
  <FileUpload.Items />
</FileUpload.ItemGroup>
```

## Examples

### Accepted Files

Specify the accepted file types for upload using the `accept` prop.

<ComponentExample name="acceptedFiles" />

### Multiple Files

Upload multiple files at once using the `maxFiles` prop.

<ComponentExample name="maxFiles" />

### Image Preview

Use the `FileUpload.ItemPreviewImage` component to render a preview of image files.

<ComponentExample name="imagePreview" />

### Directory

Use the `directory` prop to allow selecting a directory instead of a file.

```tsx
import { FolderUpIcon } from 'lucide-react'
import { Button, FileUpload } from '@/components/ui'

export const App = () => {
  return (
    <FileUpload.Root directory>
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <FolderUpIcon /> Upload directory
        </Button>
      </FileUpload.Trigger>
      <FileUpload.List />
    </FileUpload.Root>
  )
}

```

### Media Capture

Use the `capture` prop to capture and upload media directly from the device camera or microphone.

:::info

The `capture` prop is only supported on mobile devices.

:::

<ComponentExample name="mediaCapture" />

### Dropzone

Drop multiple files inside the dropzone. Use the `maxFiles` prop to limit the number of files that can be uploaded at once.

```tsx
import { UploadIcon } from 'lucide-react'
import { Box } from 'styled-system/jsx'
import { FileUpload, Icon } from '@/components/ui'

export const App = () => {
  return (
    <FileUpload.Root>
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone>
        <Icon color="fg.muted" size="lg" mb="4">
          <UploadIcon />
        </Icon>
        <Box>Drag and drop files here</Box>
        <Box color="fg.muted">.png, .jpg up to 5MB</Box>
      </FileUpload.Dropzone>
      <FileUpload.List />
    </FileUpload.Root>
  )
}

```

### Input

Use the `FileInput` component to create a trigger that looks like a text input.

<ComponentExample name="withInput" />

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `size` | 'md' | `'md'` |
| `allowDrop` | true | `boolean`<br/>Whether to allow drag and drop in the dropzone element |
| `locale` | \en-US\ | `string`<br/>The current locale. Based on the BCP 47 definition. |
| `maxFiles` | 1 | `number`<br/>The maximum number of files |
| `maxFileSize` | Infinity | `number`<br/>The maximum file size in bytes |
| `minFileSize` | 0 | `number`<br/>The minimum file size in bytes |
| `preventDocumentDrop` | true | `boolean`<br/>Whether to prevent the drop event on the document |
| `accept` | - | `Record<string, string[]> | FileMimeType | FileMimeType[]`<br/>The accept file types |
| `acceptedFiles` | - | `File[]`<br/>The controlled accepted files |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `capture` | - | `'user' | 'environment'`<br/>The default camera to use when capturing media |
| `defaultAcceptedFiles` | - | `File[]`<br/>The default accepted files when rendered.
Use when you don't need to control the accepted files of the input. |
| `directory` | - | `boolean`<br/>Whether to accept directories, only works in webkit browsers |
| `disabled` | - | `boolean`<br/>Whether the file input is disabled |
| `ids` | - | `Partial<{
  root: string
  dropzone: string
  hiddenInput: string
  trigger: string
  label: string
  item: (id: string) => string
  itemName: (id: string) => string
  itemSizeText: (id: string) => string
  itemPreview: (id: string) => string
}>`<br/>The ids of the elements. Useful for composition. |
| `invalid` | - | `boolean`<br/>Whether the file input is invalid |
| `name` | - | `string`<br/>The name of the underlying file input |
| `onFileAccept` | - | `(details: FileAcceptDetails) => void`<br/>Function called when the file is accepted |
| `onFileChange` | - | `(details: FileChangeDetails) => void`<br/>Function called when the value changes, whether accepted or rejected |
| `onFileReject` | - | `(details: FileRejectDetails) => void`<br/>Function called when the file is rejected |
| `required` | - | `boolean`<br/>Whether the file input is required |
| `transformFiles` | - | `(files: File[]) => Promise<File[]>`<br/>Function to transform the accepted files to apply transformations |
| `translations` | - | `IntlTranslations`<br/>The localized messages to use. |
| `validate` | - | `(file: File, details: FileValidateDetails) => FileError[] | null`<br/>Function to validate a file |

### Dropzone

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `disableClick` | - | `boolean`<br/>Whether to disable the click event on the dropzone |

### Item

| Prop | Default | Type |
| --- | --- | --- |
| `file`* | - | `File` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

### ItemPreview

| Prop | Default | Type |
| --- | --- | --- |
| `type` | '.*' | `string`<br/>The file type to match against. Matches all file types by default. |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

# Input

A form input component for collecting text input from users.

```tsx
import { Input } from '@/components/ui'

export const App = () => {
  return <Input placeholder="Enter your email" />
}

```

## Installation

Use the Park UI CLI to add the Input component to your project:

```bash
npx @park-ui/cli add input
```

## Usage

```tsx
import { Input } from '@/components/ui'
```

```tsx
<Input placeholder="Enter your email" />
```

## Examples

### Variants

Use the `variant` prop to change the visual style of the input.

```tsx
import { Stack } from 'styled-system/jsx'
import { Input } from '@/components/ui'

export const App = () => {
  const variants = ['outline', 'subtle', 'surface', 'flushed'] as const
  return (
    <Stack gap="4">
      {variants.map((variant) => (
        <Input key={variant} placeholder={variant} variant={variant} />
      ))}
    </Stack>
  )
}

```

### Sizes

Use the `size` prop to change the size of the input.

```tsx
import { Stack } from 'styled-system/jsx'
import { Input } from '@/components/ui'

export const App = () => {
  const sizes = ['sm', 'md', 'lg', 'xl'] as const
  return (
    <Stack gap="4">
      {sizes.map((size) => (
        <Input key={size} placeholder={size} size={size} />
      ))}
    </Stack>
  )
}

```

### Field

Compose the input with the `Field` component to add a label, helper text, and error message.

```tsx
import { Field, Input } from '@/components/ui'

export const App = () => {
  return (
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <Input placeholder="Enter your email" />
      <Field.HelperText>Your email will not be shared with anyone else.</Field.HelperText>
    </Field.Root>
  )
}

```

### Required

Pass the `required` prop to `Field.Root` and use the `Field.RequiredIndicator` to indicate that the input is required.

```tsx
import { Field, Input } from '@/components/ui'

export const App = () => {
  return (
    <Field.Root required>
      <Field.Label>
        Email <Field.RequiredIndicator />
      </Field.Label>
      <Input placeholder="Enter your email" />
    </Field.Root>
  )
}

```

### Invalid

Pass the `invalid` prop to the `Field.Root` and use the `Field.ErrorText` to indicate that the input is invalid.

```tsx
import { Field, Input } from '@/components/ui'

export const App = () => {
  return (
    <Field.Root invalid>
      <Field.Label>Email</Field.Label>
      <Input placeholder="Enter your email" />
      <Field.ErrorText>Please enter a valid email address.</Field.ErrorText>
    </Field.Root>
  )
}

```

### Element

Use the `startElement` and `endElement` on the `InputGroup` component to add an element to the start and end of the input.

```tsx
import { EuroIcon, InfoIcon, UserIcon } from 'lucide-react'
import { Stack } from 'styled-system/jsx'
import { Input, InputGroup } from '@/components/ui'

export const App = () => {
  return (
    <Stack gap="4">
      <InputGroup startElement={<UserIcon />}>
        <Input placeholder="Username" />
      </InputGroup>

      <InputGroup endElement={<EuroIcon />}>
        <Input placeholder="0.00" />
      </InputGroup>

      <InputGroup startElement={<EuroIcon />} endElement={<InfoIcon />}>
        <Input placeholder="0.00" />
      </InputGroup>
    </Stack>
  )
}

```

### Addon

Use the `InputAddon` and `Group` components to add an addon to the input.

```tsx
import { AtSignIcon, EuroIcon } from 'lucide-react'
import { Stack } from 'styled-system/jsx'
import { Group, Input, InputAddon } from '@/components/ui'

export const App = () => {
  return (
    <Stack gap="4">
      <Group attached>
        <InputAddon>https://</InputAddon>
        <Input placeholder="yoursite.com" />
      </Group>
      <Group attached>
        <InputAddon>
          <AtSignIcon />
        </InputAddon>
        <Input placeholder="Username" />
      </Group>
      <Group attached>
        <InputAddon>
          <EuroIcon />
        </InputAddon>
        <Input placeholder="0.00" />
        <InputAddon>EUR</InputAddon>
      </Group>
    </Stack>
  )
}

```

### Button

Use the `Group` component to attach a button to the input.

```tsx
import { Button, Group, Input } from '@/components/ui'

export const App = () => {
  return (
    <Group attached width="full">
      <Input placeholder="Enter your email" />
      <Button variant="outline" colorPalette="gray">
        Submit
      </Button>
    </Group>
  )
}

```

### Ref

Here's how to access the underlying element reference

```tsx
'use client'
import { useRef } from 'react'
import { Input } from '@/components/ui'

export const App = () => {
  const ref = useRef<HTMLInputElement>(null)
  return <Input ref={ref} />
}

```

## Props

| Prop | Default | Type |
| --- | --- | --- |
| `variant` | 'outline' | `'outline' | 'surface' | 'subtle' | 'flushed'` |
| `size` | 'md' | `'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'` |

# Number Input

A form input component for entering and adjusting numeric values.

```tsx
import { NumberInput } from '@/components/ui'

export const App = () => {
  return (
    <NumberInput.Root defaultValue="42">
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Number-input component to your project:

```bash
npx @park-ui/cli add number-input
```

## Usage

```tsx
import { NumberInput } from '@/components/ui'
```

```tsx
<NumberInput.Root>
  <NumberInput.Label />
  <NumberInput.ValueText />
  <NumberInput.Control>
    <NumberInput.IncrementTrigger />
    <NumberInput.DecrementTrigger />
  </NumberInput.Control>
  <NumberInput.Scrubber />
  <NumberInput.Input />
</NumberInput.Root>
```

:::info

If you prefer a closed component composition, check out the
[snippet below](#closed-component).

:::

## Shortcuts

The `NumberInput` component provides a set of shortcuts for common use cases

### NumberInput.Control

This component renders the `NumberInput.IncrementTrigger` and `NumberInput.DecrementTrigger` within it by default.

Writing this:

```tsx
<NumberInput.Control />
```

is shorthand for writing this if you don't need to customize the triggers:

```tsx
<NumberInput.Control>
  <NumberInput.IncrementTrigger />
  <NumberInput.DecrementTrigger />
</NumberInput.Control>
```

## Examples

### Sizes

Pass the `size` prop to change the size of the number input.

```tsx
import { Stack } from 'styled-system/jsx'
import { NumberInput } from '@/components/ui'

export const App = () => {
  const sizes = ['sm', 'md', 'lg', 'xl'] as const
  return (
    <Stack gap="4">
      {sizes.map((size) => (
        <NumberInput.Root key={size} size={size} defaultValue="42">
          <NumberInput.Control />
          <NumberInput.Input />
        </NumberInput.Root>
      ))}
    </Stack>
  )
}

```

### Formatting

Pass the `formatOptions` prop to format the number input value. The value of this maps to `Intl.NumberFormatOptions` and is applied based on the current locale.

```tsx
import { Stack } from 'styled-system/jsx'
import { NumberInput } from '@/components/ui'

export const App = () => {
  return (
    <Stack gap="4">
      <NumberInput.Root
        defaultValue="5"
        step={0.01}
        formatOptions={{
          style: 'percent',
        }}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>

      <NumberInput.Root
        defaultValue="45"
        formatOptions={{
          style: 'currency',
          currency: 'EUR',
          currencyDisplay: 'code',
          currencySign: 'accounting',
        }}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>

      <NumberInput.Root
        defaultValue="4"
        formatOptions={{
          style: 'unit',
          unit: 'inch',
          unitDisplay: 'long',
        }}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
    </Stack>
  )
}

```

### Min and Max

Pass the `min` and `max` props  to set the minimum and maximum values of the number input.

If value entered is less than `min` or greater than `max`, the value will be clamped to the nearest boundary on blur, or enter key press.

```tsx
import { NumberInput } from '@/components/ui'

export const App = () => {
  return (
    <NumberInput.Root defaultValue="42" min={5} max={50}>
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  )
}

```

### Step

Pass the `step` prop  to change the increment or decrement interval of the number input.

```tsx
import { NumberInput } from '@/components/ui'

export const App = () => {
  return (
    <NumberInput.Root defaultValue="2" step={3}>
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  )
}

```


### Controlled

Pass the `value` and `onValueChange` props to control the value of the number input.

```tsx
'use client'
import { useState } from 'react'
import { NumberInput } from '@/components/ui'

export const App = () => {
  const [value, setValue] = useState('10')
  return (
    <NumberInput.Root value={value} onValueChange={(e) => setValue(e.value)}>
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  )
}

```

### Mouse Wheel

Pass the `allowMouseWheel` prop to enable or disable the mouse wheel to change the value of the number input.

```tsx
import { NumberInput } from '@/components/ui'

export const App = () => {
  return (
    <NumberInput.Root defaultValue="42" allowMouseWheel>
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  )
}

```

### Disabled

Pass the `disabled` prop  to disable the number input.

```tsx
import { NumberInput } from '@/components/ui'

export const App = () => {
  return (
    <NumberInput.Root defaultValue="42" disabled>
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  )
}

```

### Invalid

Use the `Field` component and the `invalid` prop to indicate that the number input is invalid.

```tsx
import { Field, NumberInput } from '@/components/ui'

export const App = () => {
  return (
    <Field.Root invalid>
      <Field.Label>Quantity</Field.Label>
      <NumberInput.Root defaultValue="42">
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
      <Field.ErrorText>The entry is invalid</Field.ErrorText>
    </Field.Root>
  )
}

```

### Helper Text

Compose the `Field` and `Field.HelperText` components to add helper text to the number input.

```tsx
import { Field, NumberInput } from '@/components/ui'

export const App = () => {
  return (
    <Field.Root>
      <Field.Label>Quantity</Field.Label>
      <NumberInput.Root defaultValue="42" min={5} max={50}>
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
      <Field.HelperText>Please enter a number between 5 and 50</Field.HelperText>
    </Field.Root>
  )
}

```

### Element

Here's an example of how to compose the number input with the input group component to add an element on either the left or right.

```tsx
import { DollarSignIcon } from 'lucide-react'
import { InputGroup, NumberInput } from '@/components/ui'

export const App = () => {
  return (
    <NumberInput.Root defaultValue="42">
      <NumberInput.Control />
      <InputGroup startElement={<DollarSignIcon />}>
        <NumberInput.Input />
      </InputGroup>
    </NumberInput.Root>
  )
}

```

### Scrubber

Use the `NumberInput.Scrubber` component to make the number input supports scrubber interactions.

```tsx
import { ArrowLeftRightIcon } from 'lucide-react'
import { InputGroup, NumberInput } from '@/components/ui'

export const App = () => {
  return (
    <NumberInput.Root defaultValue="42">
      <NumberInput.Control />
      <InputGroup
        startElement={
          <NumberInput.Scrubber pointerEvents="auto">
            <ArrowLeftRightIcon />
          </NumberInput.Scrubber>
        }
      >
        <NumberInput.Input />
      </InputGroup>
    </NumberInput.Root>
  )
}

```


### Closed Component

Here is an example of how to use the `NumberInput` component in a closed manner.

```tsx
import { forwardRef, type InputHTMLAttributes, type RefObject } from 'react'
import { NumberInput as StyledNumberInput } from '@/components/ui'

export interface NumberInputProps extends StyledNumberInput.RootProps {
  rootRef?: RefObject<HTMLDivElement | null>
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(props, ref) {
    const { inputProps, rootRef, ...rest } = props
    return (
      <StyledNumberInput.Root ref={rootRef} {...rest}>
        <StyledNumberInput.Control />
        <StyledNumberInput.Input ref={ref} {...inputProps} />
      </StyledNumberInput.Root>
    )
  },
)

```

and use it like this:

```tsx
<NumberInput defaultValue="42" />
```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `size` | 'md' | `'sm' | 'md' | 'lg' | 'xl'` |
| `variant` | 'outline' | `'outline' | 'surface'` |
| `allowOverflow` | true | `boolean`<br/>Whether to allow the value overflow the min/max range |
| `clampValueOnBlur` | true | `boolean`<br/>Whether to clamp the value when the input loses focus (blur) |
| `focusInputOnChange` | true | `boolean`<br/>Whether to focus input when the value changes |
| `inputMode` | \decimal\ | `InputMode`<br/>Hints at the type of data that might be entered by the user. It also determines
the type of keyboard shown to the user on mobile devices |
| `locale` | \en-US\ | `string`<br/>The current locale. Based on the BCP 47 definition. |
| `max` | Number.MAX_SAFE_INTEGER | `number`<br/>The maximum value of the number input |
| `min` | Number.MIN_SAFE_INTEGER | `number`<br/>The minimum value of the number input |
| `pattern` | \-?[0-9]*(.[0-9]+)?\ | `string`<br/>The pattern used to check the <input> element's value against |
| `spinOnPress` | true | `boolean`<br/>Whether to spin the value when the increment/decrement button is pressed |
| `step` | 1 | `number`<br/>The amount to increment or decrement the value by |
| `allowMouseWheel` | - | `boolean`<br/>Whether to allow mouse wheel to change the value |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `defaultValue` | - | `string`<br/>The initial value of the input when rendered.
Use when you don't need to control the value of the input. |
| `disabled` | - | `boolean`<br/>Whether the number input is disabled. |
| `form` | - | `string`<br/>The associate form of the input element. |
| `formatOptions` | - | `NumberFormatOptions`<br/>The options to pass to the `Intl.NumberFormat` constructor |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{
  root: string
  label: string
  input: string
  incrementTrigger: string
  decrementTrigger: string
  scrubber: string
}>`<br/>The ids of the elements in the number input. Useful for composition. |
| `invalid` | - | `boolean`<br/>Whether the number input value is invalid. |
| `name` | - | `string`<br/>The name attribute of the number input. Useful for form submission. |
| `onFocusChange` | - | `(details: FocusChangeDetails) => void`<br/>Function invoked when the number input is focused |
| `onValueChange` | - | `(details: ValueChangeDetails) => void`<br/>Function invoked when the value changes |
| `onValueInvalid` | - | `(details: ValueInvalidDetails) => void`<br/>Function invoked when the value overflows or underflows the min/max range |
| `readOnly` | - | `boolean`<br/>Whether the number input is readonly |
| `required` | - | `boolean`<br/>Whether the number input is required |
| `translations` | - | `IntlTranslations`<br/>Specifies the localized strings that identifies the accessibility elements and their states |
| `value` | - | `string`<br/>The controlled value of the input |

# Radio Card Group

A form input component for selecting one option from a set of cards.

```tsx
import { HStack } from 'styled-system/jsx'
import { RadioCardGroup } from '@/components/ui'

export const App = () => {
  return (
    <RadioCardGroup.Root defaultValue="react">
      <RadioCardGroup.Label>Select framework</RadioCardGroup.Label>
      <HStack alignItems="stretch">
        {items.map((item) => (
          <RadioCardGroup.Item key={item.value} value={item.value}>
            <RadioCardGroup.ItemHiddenInput />
            <RadioCardGroup.ItemText>{item.title}</RadioCardGroup.ItemText>
            <RadioCardGroup.ItemControl />
          </RadioCardGroup.Item>
        ))}
      </HStack>
    </RadioCardGroup.Root>
  )
}

const items = [
  { value: 'react', title: 'React' },
  { value: 'solid', title: 'Solid' },
  { value: 'vue', title: 'Vue' },
]

```

## Installation

Use the Park UI CLI to add the Radio-card-group component to your project:

```bash
npx @park-ui/cli add radio-card-group
```

## Usage

```tsx
import { RadioCardGroup } from '@/components/ui'
```

```tsx
<RadioCardGroup.Root>
  <RadioCardGroup.Label />
  <RadioCardGroup.Item>
    <RadioCardGroup.ItemHiddenInput />
    <RadioCardGroup.ItemText />
    <RadioCardGroup.ItemControl />
  </RadioCardGroup.Item>
</RadioCardGroup.Root>
```

## Examples

### Variants

Use the `variant` prop to change the appearance of the radio cards.

```tsx
import { HStack, Stack } from 'styled-system/jsx'
import { RadioCardGroup } from '@/components/ui'

export const App = () => {
  const variants = ['solid', 'surface', 'subtle', 'outline'] as const
  return (
    <Stack gap="4">
      {variants.map((variant) => (
        <RadioCardGroup.Root key={variant} variant={variant} defaultValue="react">
          <HStack>
            {items.map((item) => (
              <RadioCardGroup.Item key={item.value} value={item.value}>
                <RadioCardGroup.ItemHiddenInput />
                <RadioCardGroup.ItemText>{item.title}</RadioCardGroup.ItemText>
                <RadioCardGroup.ItemControl />
              </RadioCardGroup.Item>
            ))}
          </HStack>
        </RadioCardGroup.Root>
      ))}
    </Stack>
  )
}

const items = [
  { value: 'react', title: 'React' },
  { value: 'solid', title: 'Solid' },
  { value: 'vue', title: 'Vue' },
]

```

## Props

| Prop | Default | Type |
| --- | --- | --- |
| `variant` | 'outline' | `'subtle' | 'outline' | 'surface' | 'solid'` |
| `size` | 'md' | `'md'` |

# Radio Group

A form input component for selecting one option from a set of choices.

```tsx
import { RadioGroup } from '@/components/ui'

export const App = () => {
  return (
    <RadioGroup.Root defaultValue="react">
      {items.map((item) => (
        <RadioGroup.Item key={item.value} value={item.value}>
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

```

## Installation

Use the Park UI CLI to add the Radio-group component to your project:

```bash
npx @park-ui/cli add radio-group
```

## Usage

```tsx
import { RadioGroup } from '@/components/ui'
```

```tsx
<RadioGroup.Root>
  <RadioGroup.Item>
    <RadioGroup.ItemHiddenInput />
    <RadioGroup.ItemControl />
    <RadioGroup.ItemText />
  </RadioGroup.Item>
</RadioGroup.Root>
```

:::info

If you prefer a closed component composition, check out the [snippet below](#closed-component).

:::

## Examples

### Controlled

Pass the `value` and `onValueChange` props to the `RadioGroup.Root` component to
control the selected radio button.

```tsx
'use client'
import { useState } from 'react'
import { RadioGroup } from '@/components/ui'

export const App = () => {
  const [value, setValue] = useState<string | null>('react')
  return (
    <RadioGroup.Root value={value} onValueChange={(e) => setValue(e.value)}>
      {items.map((item) => (
        <RadioGroup.Item key={item.value} value={item.value}>
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

```

### Colors

Pass the `colorPalette` prop to the `RadioGroup.Root` component to change the
color scheme of the component.

```tsx
import { Stack } from 'styled-system/jsx'
import { RadioGroup } from '@/components/ui'

export const App = () => {
  const colors = ['blue', 'green', 'amber', 'red'] as const
  return (
    <Stack gap="4">
      {colors.map((color) => (
        <RadioGroup.Root
          key={color}
          defaultValue="react"
          colorPalette={color}
          flexDir="row"
          gap="6"
        >
          {items.map((item) => (
            <RadioGroup.Item key={item.value} value={item.value}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
      ))}
    </Stack>
  )
}

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

```

### Sizes

Pass the `size` prop to the `RadioGroup.Root` component to change the size of
the radio component.

```tsx
import { Wrap } from 'styled-system/jsx'
import { RadioGroup } from '@/components/ui'

export const App = () => {
  const sizes = ['sm', 'md', 'lg'] as const
  return (
    <Wrap gap="4">
      {sizes.map((size) => (
        <RadioGroup.Root size={size} key={size} defaultValue={size}>
          <RadioGroup.Item value={size}>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>Radio ({size})</RadioGroup.ItemText>
          </RadioGroup.Item>
        </RadioGroup.Root>
      ))}
    </Wrap>
  )
}

```

### Disabled

Pass the `disabled` prop to the `RadioGroup.Item` component to make the radio
disabled.

```tsx
import { RadioGroup } from '@/components/ui'

export const App = () => {
  return (
    <RadioGroup.Root defaultValue="react">
      {items.map((item) => (
        <RadioGroup.Item key={item.value} value={item.value} disabled={item.disabled}>
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte', disabled: true },
]

```

### Closed Component

Here's how to setup the Radio for a closed component composition.

```tsx
import { forwardRef, type InputHTMLAttributes } from 'react'
import * as StyledRadioGroup from '@/components/ui/radio-group'

export interface RadioProps extends StyledRadioGroup.ItemProps {
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(props, ref) {
  const { children, inputProps, ...rest } = props
  return (
    <StyledRadioGroup.Item {...rest}>
      <StyledRadioGroup.ItemHiddenInput ref={ref} {...inputProps} />
      <StyledRadioGroup.ItemControl />
      {children && <StyledRadioGroup.ItemText>{children}</StyledRadioGroup.ItemText>}
    </StyledRadioGroup.Item>
  )
})

export const RadioGroup = StyledRadioGroup.Root

```

Here's how to use it:

```tsx
<RadioGroup>
  <Radio />
</RadioGroup>
```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `variant` | 'solid' | `'solid'` |
| `size` | 'md' | `'sm' | 'md' | 'lg'` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `defaultValue` | - | `string`<br/>The initial value of the checked radio when rendered.
Use when you don't need to control the value of the radio group. |
| `disabled` | - | `boolean`<br/>If `true`, the radio group will be disabled |
| `form` | - | `string`<br/>The associate form of the underlying input. |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{
  root: string
  label: string
  indicator: string
  item: (value: string) => string
  itemLabel: (value: string) => string
  itemControl: (value: string) => string
  itemHiddenInput: (value: string) => string
}>`<br/>The ids of the elements in the radio. Useful for composition. |
| `name` | - | `string`<br/>The name of the input fields in the radio
(Useful for form submission). |
| `onValueChange` | - | `(details: ValueChangeDetails) => void`<br/>Function called once a radio is checked |
| `orientation` | - | `'horizontal' | 'vertical'`<br/>Orientation of the radio group |
| `readOnly` | - | `boolean`<br/>Whether the checkbox is read-only |
| `value` | - | `string`<br/>The controlled value of the radio group |

### Item

| Prop | Default | Type |
| --- | --- | --- |
| `value`* | - | `string` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `disabled` | - | `boolean` |
| `invalid` | - | `boolean` |

# Rating Group

A form input component for capturing user ratings and reviews.

```tsx
import { RatingGroup } from '@/components/ui'

export const App = () => {
  return (
    <RatingGroup.Root count={5} defaultValue={3}>
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Rating-group component to your project:

```bash
npx @park-ui/cli add rating-group
```

## Usage

```tsx
import { RatingGroup } from '@/components/ui'
```

```tsx
<RatingGroup.Root>
  <RatingGroup.Label />
  <RatingGroup.HiddenInput />
  <RatingGroup.Control>
    <RatingGroup.Item>
      <RatingGroup.ItemIndicator />
    </RatingGroup.Item>
  </RatingGroup.Control>
</RatingGroup.Root>
```


## Shortcuts

The `RatingGroup` component also provides a set of shortcuts for common use cases.

### RatingControl

This component renders the number of rating items specified in the `count` prop.

This works:

```tsx
<RatingGroup.Control>
  {Array.from({ length: 5 }).map((_, index) => (
    <RatingGroup.Item key={index} index={index + 1}>
      <RatingGroup.ItemIndicator />
    </RatingGroup.Item>
  ))}
</RatingGroup.Control>
```

This might be more concise, if you don't need to customize the rating icons:

```tsx
<RatingGroup.Control />
```

## Examples

### Sizes

Use the `size` prop to change the size of the rating component.

```tsx
import { Stack } from 'styled-system/jsx'
import { RatingGroup } from '@/components/ui'

export const App = () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

  return (
    <Stack gap="4">
      {sizes.map((size) => (
        <RatingGroup.Root key={size} count={5} defaultValue={3} size={size}>
          <RatingGroup.HiddenInput />
          <RatingGroup.Control />
        </RatingGroup.Root>
      ))}
    </Stack>
  )
}

```

### Controlled

Use the `value` and `onValueChange` prop to control the rating value.

```tsx
'use client'
import { useState } from 'react'
import { RatingGroup } from '@/components/ui'

export const App = () => {
  const [value, setValue] = useState(3)
  return (
    <RatingGroup.Root count={5} value={value} onValueChange={(e) => setValue(e.value)}>
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}

```

### ReadOnly

Use the `readOnly` prop to make the rating component read-only.

```tsx
import { RatingGroup } from '@/components/ui'

export const App = () => {
  return (
    <RatingGroup.Root readOnly count={5} defaultValue={3}>
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}

```

### Custom Icon

Use the `icon` prop to pass a custom icon to the rating component. This will override the default star icon.

```tsx
import { HeartIcon } from 'lucide-react'
import { RatingGroup } from '@/components/ui'

export const App = () => {
  return (
    <RatingGroup.Root count={5} defaultValue={3}>
      <RatingGroup.HiddenInput />
      <RatingGroup.Control>
        <RatingGroup.Items icon={<HeartIcon />} />
      </RatingGroup.Control>
    </RatingGroup.Root>
  )
}

```

### Label

Render the `RatingGroup.Label` component to provide a human-readable label for the rating component.

```tsx
import { RatingGroup } from '@/components/ui'

export const App = () => {
  return (
    <RatingGroup.Root count={5} defaultValue={3}>
      <RatingGroup.HiddenInput />
      <RatingGroup.Label>Rating</RatingGroup.Label>
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}

```

### Half Star

Use the `allowHalf` prop to allow half-star ratings.

```tsx
import { RatingGroup } from '@/components/ui'

export const App = () => {
  return (
    <RatingGroup.Root allowHalf count={5} defaultValue={3.5}>
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}

```

### Colors

Use the `colorPalette` prop to change the color of the rating.

```tsx
import { Stack } from 'styled-system/jsx'
import { RatingGroup } from '@/components/ui'

export const App = () => {
  const colors = ['blue', 'green', 'amber', 'red'] as const
  return (
    <Stack gap="4">
      {colors.map((color) => (
        <RatingGroup.Root key={color} count={5} defaultValue={3} colorPalette={color}>
          <RatingGroup.HiddenInput />
          <RatingGroup.Control />
        </RatingGroup.Root>
      ))}
    </Stack>
  )
}

```

### Closed Component

Here's how to setup the Rating for a closed component composition.

```tsx
import { forwardRef, type ReactElement, type ReactNode } from 'react'
import { RatingGroup as StyledRatingGroup } from '@/components/ui'

export interface RatingProps extends StyledRatingGroup.RootProps {
  icon?: ReactElement
  count?: number
  label?: ReactNode
}

export const RatingGroup = forwardRef<HTMLDivElement, RatingProps>(function Rating(props, ref) {
  const { icon, count = 5, label, ...rest } = props
  return (
    <StyledRatingGroup.Root ref={ref} count={count} {...rest}>
      {label && <StyledRatingGroup.Label>{label}</StyledRatingGroup.Label>}
      <StyledRatingGroup.HiddenInput />
      <StyledRatingGroup.Control>
        <StyledRatingGroup.Items icon={icon} />
      </StyledRatingGroup.Control>
    </StyledRatingGroup.Root>
  )
})

```

So that you can use it like this:

```tsx
<RatingGroup defaultValue={3} size="sm" />
```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `size` | 'md' | `'xs' | 'sm' | 'md' | 'lg' | 'xl'` |
| `count` | 5 | `number`<br/>The total number of ratings. |
| `allowHalf` | - | `boolean`<br/>Whether to allow half stars. |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `autoFocus` | - | `boolean`<br/>Whether to autofocus the rating. |
| `defaultValue` | - | `number`<br/>The initial value of the rating when rendered.
Use when you don't need to control the value of the rating. |
| `disabled` | - | `boolean`<br/>Whether the rating is disabled. |
| `form` | - | `string`<br/>The associate form of the underlying input element. |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{
  root: string
  label: string
  hiddenInput: string
  control: string
  item: (id: string) => string
}>`<br/>The ids of the elements in the rating. Useful for composition. |
| `name` | - | `string`<br/>The name attribute of the rating element (used in forms). |
| `onHoverChange` | - | `(details: HoverChangeDetails) => void`<br/>Function to be called when the rating value is hovered. |
| `onValueChange` | - | `(details: ValueChangeDetails) => void`<br/>Function to be called when the rating value changes. |
| `readOnly` | - | `boolean`<br/>Whether the rating is readonly. |
| `required` | - | `boolean`<br/>Whether the rating is required. |
| `translations` | - | `IntlTranslations`<br/>Specifies the localized strings that identifies the accessibility elements and their states |
| `value` | - | `number`<br/>The controlled value of the rating |

### Item

| Prop | Default | Type |
| --- | --- | --- |
| `index`* | - | `number` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

# Segment Group

A form input component for selecting one option from a segmented control.

```tsx
import { SegmentGroup } from '@/components/ui'

export const App = () => {
  const items = ['React', 'Solid', 'Svelte', 'Vue']

  return (
    <SegmentGroup.Root defaultValue="React">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={items} />
    </SegmentGroup.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Segment-group component to your project:

```bash
npx @park-ui/cli add segment-group
```

## Usage

```tsx
import { SegmentGroup } from '@/components/ui'
```

```tsx
<SegmentGroup.Root>
  <SegmentGroup.Indicator />
  <SegmentGroup.Item>
    <SegmentGroup.ItemText />
    <SegmentGroup.ItemHiddenInput />
  </SegmentGroup.Item>
</SegmentGroup.Root>
```

## Shortcuts

The `SegmentGroup` component also provides a set of shortcuts for common use cases.

### SegmentGroupItems

The `SegmentGroup.Items` shortcut renders a list of items based on the `items` prop:

```tsx
<>
  {items.map((item) => (
    <SegmentGroup.Item key={item.value} value={item.value}>
      <SegmentGroup.ItemText>{item.label}</SegmentGroup.ItemText>
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
  ))}
</>
```

This might be more concise, if you don't need to customize the items:

```tsx
<SegmentGroup.Items items={items} />
```

## Examples

### Sizes

Use the `size` prop to change the size of the segmented group.

```tsx
import { Stack } from 'styled-system/jsx'
import { SegmentGroup } from '@/components/ui'

export const App = () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

  return (
    <Stack gap="4" alignItems="start">
      {sizes.map((size) => (
        <SegmentGroup.Root key={size} defaultValue="React" size={size}>
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={items} />
        </SegmentGroup.Root>
      ))}
    </Stack>
  )
}

const items = ['React', 'Solid', 'Svelte', 'Vue']

```

### Fitted

Use the `fitted` prop to make the tabs fit the width of the container.

```tsx
import { SegmentGroup } from '@/components/ui'

export const App = () => {
  const items = ['React', 'Solid', 'Svelte', 'Vue']

  return (
    <SegmentGroup.Root defaultValue="React" fitted>
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={items} />
    </SegmentGroup.Root>
  )
}

```

### Vertical

By default, the segmented control is horizontal. Set the `orientation` prop to `vertical` to change the orientation of the segmented group.

```tsx
import { SegmentGroup } from '@/components/ui'

export const App = () => {
  const items = ['React', 'Solid', 'Svelte', 'Vue']

  return (
    <SegmentGroup.Root defaultValue="React" orientation="vertical">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={items} />
    </SegmentGroup.Root>
  )
}

```

### Icon

Use icons inside the segmented group items.

```tsx
import { Grid2X2Icon, ListIcon, TableIcon } from 'lucide-react'
import { HStack } from 'styled-system/jsx'
import { SegmentGroup } from '@/components/ui'

export const App = () => {
  return (
    <SegmentGroup.Root defaultValue="table">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items
        items={[
          {
            value: 'table',
            label: (
              <HStack>
                <TableIcon />
                Table
              </HStack>
            ),
          },
          {
            value: 'board',
            label: (
              <HStack>
                <Grid2X2Icon />
                Board
              </HStack>
            ),
          },
          {
            value: 'list',
            label: (
              <HStack>
                <ListIcon />
                List
              </HStack>
            ),
          },
        ]}
      />
    </SegmentGroup.Root>
  )
}

```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `size` | 'md' | `'xs' | 'sm' | 'md' | 'lg' | 'xl'` |
| `fitted` | - | `boolean` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `defaultValue` | - | `string`<br/>The initial value of the checked radio when rendered.
Use when you don't need to control the value of the radio group. |
| `disabled` | - | `boolean`<br/>If `true`, the radio group will be disabled |
| `form` | - | `string`<br/>The associate form of the underlying input. |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{
  root: string
  label: string
  indicator: string
  item: (value: string) => string
  itemLabel: (value: string) => string
  itemControl: (value: string) => string
  itemHiddenInput: (value: string) => string
}>`<br/>The ids of the elements in the radio. Useful for composition. |
| `name` | - | `string`<br/>The name of the input fields in the radio
(Useful for form submission). |
| `onValueChange` | - | `(details: ValueChangeDetails) => void`<br/>Function called once a radio is checked |
| `orientation` | - | `'horizontal' | 'vertical'`<br/>Orientation of the radio group |
| `readOnly` | - | `boolean`<br/>Whether the checkbox is read-only |
| `value` | - | `string`<br/>The controlled value of the radio group |

### Item

| Prop | Default | Type |
| --- | --- | --- |
| `value`* | - | `string` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `disabled` | - | `boolean` |
| `invalid` | - | `boolean` |

# Select

A form input component for choosing one option from a dropdown list.

```tsx
'use client'
import { createListCollection } from '@ark-ui/react/collection'
import { Select } from '@/components/ui'

const collection = createListCollection({
  items: ['React', 'Vue', 'Svelte', 'Angular'],
})

export const App = () => {
  return (
    <Select.Root collection={collection} maxW="xs">
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a framework" />
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {collection.items.map((item) => (
            <Select.Item key={item} item={item}>
              <Select.ItemText>{item}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Select component to your project:

```bash
npx @park-ui/cli add select
```

## Usage

```tsx
import { Select } from '@/components/ui'
```

```tsx
<Select.Root>
  <Select.HiddenSelect />
  <Select.Label />
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText />
    </Select.Trigger>
    <Select.IndicatorGroup>
      <Select.Indicator />
      <Select.ClearTrigger />
    </Select.IndicatorGroup>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      <Select.Item />
      <Select.ItemGroup>
        <Select.ItemGroupLabel />
        <Select.Item />
      </Select.ItemGroup>
    </Select.Content>
  </Select.Positioner>
</Select.Root>
```


## Examples

### Size

Use the `size` prop to change the size of the select component.

```tsx
'use client'
import { createListCollection } from '@ark-ui/react/collection'
import { Portal } from '@ark-ui/react/portal'
import { Stack } from 'styled-system/jsx'
import { Select } from '@/components/ui'

export const App = () => {
  const sizes = ['sm', 'md', 'lg'] as const
  return (
    <Stack gap="4">
      {sizes.map((size) => (
        <Select.Root key={size} size={size} collection={frameworks}>
          <Select.HiddenSelect />
          <Select.Label>Label</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select framework" />
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Trigger>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {frameworks.items.map((framework) => (
                  <Select.Item item={framework} key={framework.value}>
                    {framework.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      ))}
    </Stack>
  )
}

const frameworks = createListCollection({
  items: [
    { label: 'React.js', value: 'react' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ],
})

```

### Option Group

Use the `Select.ItemGroup` component to group select options.

```tsx
'use client'
import { createListCollection } from '@ark-ui/react/collection'
import { Portal } from '@ark-ui/react/portal'
import { Select } from '@/components/ui'

export const App = () => {
  return (
    <Select.Root collection={collection} maxW="sm">
      <Select.HiddenSelect />
      <Select.Label>Favorite Movie</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Pick a movie" />
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.group().map(([category, items]) => (
              <Select.ItemGroup key={category}>
                <Select.ItemGroupLabel>{category}</Select.ItemGroupLabel>
                {items.map((item) => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.ItemGroup>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const collection = createListCollection({
  items: [
    { label: 'Naruto', value: 'naruto', category: 'Anime' },
    { label: 'One Piece', value: 'one-piece', category: 'Anime' },
    { label: 'Dragon Ball', value: 'dragon-ball', category: 'Anime' },
    {
      label: 'The Shawshank Redemption',
      value: 'the-shawshank-redemption',
      category: 'Movies',
    },
    { label: 'The Godfather', value: 'the-godfather', category: 'Movies' },
    { label: 'The Dark Knight', value: 'the-dark-knight', category: 'Movies' },
  ],
  groupBy: (item) => item.category,
})

```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `collection`* | - | `ListCollection<T>`<br/>The collection of items |
| `variant` | 'outline' | `'outline' | 'surface'` |
| `size` | 'md' | `'xs' | 'sm' | 'md' | 'lg' | 'xl'` |
| `closeOnSelect` | true | `boolean`<br/>Whether the select should close after an item is selected |
| `composite` | true | `boolean`<br/>Whether the select is a composed with other composite widgets like tabs or combobox |
| `lazyMount` | false | `boolean`<br/>Whether to enable lazy mounting |
| `loopFocus` | false | `boolean`<br/>Whether to loop the keyboard navigation through the options |
| `skipAnimationOnMount` | false | `boolean`<br/>Whether to allow the initial presence animation. |
| `unmountOnExit` | false | `boolean`<br/>Whether to unmount on exit. |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `defaultHighlightedValue` | - | `string`<br/>The initial value of the highlighted item when opened.
Use when you don't need to control the highlighted value of the select. |
| `defaultOpen` | - | `boolean`<br/>Whether the select's open state is controlled by the user |
| `defaultValue` | - | `string[]`<br/>The initial default value of the select when rendered.
Use when you don't need to control the value of the select. |
| `deselectable` | - | `boolean`<br/>Whether the value can be cleared by clicking the selected item.

**Note:** this is only applicable for single selection |
| `disabled` | - | `boolean`<br/>Whether the select is disabled |
| `form` | - | `string`<br/>The associate form of the underlying select. |
| `highlightedValue` | - | `string`<br/>The controlled key of the highlighted item |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{
  root: string
  content: string
  control: string
  trigger: string
  clearTrigger: string
  label: string
  hiddenSelect: string
  positioner: string
  item: (id: string | number) => string
  itemGroup: (id: string | number) => string
  itemGroupLabel: (id: string | number) => string
}>`<br/>The ids of the elements in the select. Useful for composition. |
| `immediate` | - | `boolean`<br/>Whether to synchronize the present change immediately or defer it to the next frame |
| `invalid` | - | `boolean`<br/>Whether the select is invalid |
| `multiple` | - | `boolean`<br/>Whether to allow multiple selection |
| `name` | - | `string`<br/>The `name` attribute of the underlying select. |
| `onExitComplete` | - | `VoidFunction`<br/>Function called when the animation ends in the closed state |
| `onFocusOutside` | - | `(event: FocusOutsideEvent) => void`<br/>Function called when the focus is moved outside the component |
| `onHighlightChange` | - | `(details: HighlightChangeDetails<T>) => void`<br/>The callback fired when the highlighted item changes. |
| `onInteractOutside` | - | `(event: InteractOutsideEvent) => void`<br/>Function called when an interaction happens outside the component |
| `onOpenChange` | - | `(details: OpenChangeDetails) => void`<br/>Function called when the popup is opened |
| `onPointerDownOutside` | - | `(event: PointerDownOutsideEvent) => void`<br/>Function called when the pointer is pressed down outside the component |
| `onSelect` | - | `(details: SelectionDetails) => void`<br/>Function called when an item is selected |
| `onValueChange` | - | `(details: ValueChangeDetails<T>) => void`<br/>The callback fired when the selected item changes. |
| `open` | - | `boolean`<br/>Whether the select menu is open |
| `positioning` | - | `PositioningOptions`<br/>The positioning options of the menu. |
| `present` | - | `boolean`<br/>Whether the node is present (controlled by the user) |
| `readOnly` | - | `boolean`<br/>Whether the select is read-only |
| `required` | - | `boolean`<br/>Whether the select is required |
| `scrollToIndexFn` | - | `(details: ScrollToIndexDetails) => void`<br/>Function to scroll to a specific index |
| `value` | - | `string[]`<br/>The controlled keys of the selected items |

### Item

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `item` | - | `any`<br/>The item to render |
| `persistFocus` | - | `boolean`<br/>Whether hovering outside should clear the highlighted state |

### ValueText

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `placeholder` | - | `string`<br/>Text to display when no value is selected. |

# Slider

A form input component for selecting values from a continuous range.

```tsx
import { Slider } from '@/components/ui'

export const App = () => {
  return (
    <Slider.Root width="sm" defaultValue={[40]}>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Slider component to your project:

```bash
npx @park-ui/cli add slider
```

## Usage

```tsx
import { Slider } from '@/components/ui'
```

```tsx
<Slider.Root>
  <Slider.Label />
  <Slider.ValueText />
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb>
      <Slider.DraggingIndicator />
      <Slider.HiddenInput />
    </Slider.Thumb>
    <Slider.MarkerGroup>
      <Slider.Marker />
    </Slider.MarkerGroup>
  </Slider.Control>
</Slider.Root>
```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `size` | 'md' | `'sm' | 'md' | 'lg'` |
| `variant` | 'outline' | `'outline'` |
| `orientation` | \horizontal\ | `'horizontal' | 'vertical'`<br/>The orientation of the slider |
| `max` | 100 | `number`<br/>The maximum value of the slider |
| `min` | 0 | `number`<br/>The minimum value of the slider |
| `minStepsBetweenThumbs` | 0 | `number`<br/>The minimum permitted steps between multiple thumbs.

`minStepsBetweenThumbs` * `step` should reflect the gap between the thumbs.

- `step: 1` and `minStepsBetweenThumbs: 10` => gap is `10`
- `step: 10` and `minStepsBetweenThumbs: 2` => gap is `20` |
| `origin` | \start\ | `'center' | 'start' | 'end'`<br/>The origin of the slider range. The track is filled from the origin
to the thumb for single values.
- "start": Useful when the value represents an absolute value
- "center": Useful when the value represents an offset (relative)
- "end": Useful when the value represents an offset from the end |
| `step` | 1 | `number`<br/>The step value of the slider |
| `thumbAlignment` | \contain\ | `'center' | 'contain'`<br/>The alignment of the slider thumb relative to the track
- `center`: the thumb will extend beyond the bounds of the slider track.
- `contain`: the thumb will be contained within the bounds of the track. |
| `aria-label` | - | `string[]`<br/>The aria-label of each slider thumb. Useful for providing an accessible name to the slider |
| `aria-labelledby` | - | `string[]`<br/>The `id` of the elements that labels each slider thumb. Useful for providing an accessible name to the slider |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `defaultValue` | - | `number[]`<br/>The initial value of the slider when rendered.
Use when you don't need to control the value of the slider. |
| `disabled` | - | `boolean`<br/>Whether the slider is disabled |
| `form` | - | `string`<br/>The associate form of the underlying input element. |
| `getAriaValueText` | - | `(details: ValueTextDetails) => string`<br/>Function that returns a human readable value for the slider thumb |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{
  root: string
  thumb: (index: number) => string
  hiddenInput: (index: number) => string
  control: string
  track: string
  range: string
  label: string
  valueText: string
  marker: (index: number) => string
}>`<br/>The ids of the elements in the slider. Useful for composition. |
| `invalid` | - | `boolean`<br/>Whether the slider is invalid |
| `name` | - | `string`<br/>The name associated with each slider thumb (when used in a form) |
| `onFocusChange` | - | `(details: FocusChangeDetails) => void`<br/>Function invoked when the slider's focused index changes |
| `onValueChange` | - | `(details: ValueChangeDetails) => void`<br/>Function invoked when the value of the slider changes |
| `onValueChangeEnd` | - | `(details: ValueChangeDetails) => void`<br/>Function invoked when the slider value change is done |
| `readOnly` | - | `boolean`<br/>Whether the slider is read-only |
| `thumbSize` | - | `{ width: number; height: number }`<br/>The slider thumbs dimensions |
| `value` | - | `number[]`<br/>The controlled value of the slider |

### Marker

| Prop | Default | Type |
| --- | --- | --- |
| `value`* | - | `number` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

### Thumb

| Prop | Default | Type |
| --- | --- | --- |
| `index`* | - | `number` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `name` | - | `string` |

# Switch

A form input component for toggling between on and off states.

```tsx
import { Switch } from '@/components/ui'

export const App = () => {
  return (
    <Switch.Root defaultChecked>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Switch component to your project:

```bash
npx @park-ui/cli add switch
```

## Usage

```tsx
import { Switch } from '@/components/ui'
```

```tsx
<Switch.Root>
  <Switch.HiddenInput />
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
  <Switch.Label />
</Switch.Root>
```

## Shortcuts

The `Switch` component also provides a set of shortcuts for common use cases.

### SwitchControl

The `Switch.Control` renders the `Switch.Thumb` within it by default.

This works:

```tsx
<Switch.Control>
  <Switch.Thumb />
</Switch.Control>
```

This might be more concise, if you don't need to customize the thumb:

```tsx
<Switch.Control />
```

## Examples

### Sizes

Use the `size` prop to change the size of the switch.

```tsx
import { Wrap } from 'styled-system/jsx'
import { Switch } from '@/components/ui'

export const App = () => {
  const sizes = ['xs', 'sm', 'md', 'lg'] as const

  return (
    <Wrap gap="4">
      {sizes.map((size) => (
        <Switch.Root key={size} size={size}>
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label />
        </Switch.Root>
      ))}
    </Wrap>
  )
}

```

### Controlled

Use the `checked` and `onCheckedChange` prop to control the state of the switch.

```tsx
'use client'
import { useState } from 'react'
import { Switch } from '@/components/ui'

export const App = () => {
  const [checked, setChecked] = useState(false)
  return (
    <Switch.Root checked={checked} onCheckedChange={(e) => setChecked(e.checked)}>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
  )
}

```

### Disabled

Use the `disabled` prop to disable the switch.

```tsx
import { Switch } from '@/components/ui'

export const App = () => {
  return (
    <Switch.Root disabled>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
  )
}

```

### Invalid

Use the `invalid` prop to mark the switch as invalid.

```tsx
import { Switch } from '@/components/ui'

export const App = () => {
  return (
    <Switch.Root invalid>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
  )
}

```

### Tooltip

Wrap the `Switch.Root` with a `Tooltip` to show a tooltip on hover or focus.

```tsx
import { useId } from 'react'
import { Switch, Tooltip } from '@/components/ui'

export const App = () => {
  const id = useId()
  return (
    <Tooltip ids={{ trigger: id }} content="This is a tooltip">
      <Switch.Root ids={{ root: id }}>
        <Switch.HiddenInput />
        <Switch.Control />
        <Switch.Label>Switch with tooltip</Switch.Label>
      </Switch.Root>
    </Tooltip>
  )
}

```

### Track Indicator

Use the `Switch.Indicator` component to display different indicators based on the checked state.

```tsx
import { MoonIcon, SunIcon } from 'lucide-react'
import { Icon, Switch } from '@/components/ui'

export const App = () => {
  return (
    <Switch.Root size="lg">
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
        <Switch.Indicator
          fallback={
            <Icon color="red.9">
              <MoonIcon />
            </Icon>
          }
        >
          <Icon color="blue.9">
            <SunIcon />
          </Icon>
        </Switch.Indicator>
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
    </Switch.Root>
  )
}

```

### Thumb Indicator

Use the `Switch.ThumbIndicator` component to add an icon to the switch thumb.

```tsx
import { CheckIcon, XIcon } from 'lucide-react'
import { Switch } from '@/components/ui'

export const App = () => {
  return (
    <Switch.Root>
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb>
          <Switch.ThumbIndicator fallback={<XIcon />}>
            <CheckIcon />
          </Switch.ThumbIndicator>
        </Switch.Thumb>
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
    </Switch.Root>
  )
}

```

### Closed Component

Here's how to setup the switch for a closed component composition.

```tsx
import { forwardRef, type InputHTMLAttributes, type ReactNode, type RefObject } from 'react'
import { Switch as ParkSwitch } from '@/components/ui'

export interface SwitchProps extends ParkSwitch.RootProps {
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  rootRef?: RefObject<HTMLLabelElement | null>
  trackLabel?: { on: ReactNode; off: ReactNode }
  thumbLabel?: { on: ReactNode; off: ReactNode }
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(props, ref) {
  const { inputProps, children, rootRef = null, trackLabel, thumbLabel, ...rest } = props

  return (
    <ParkSwitch.Root ref={rootRef} {...rest}>
      <ParkSwitch.HiddenInput ref={ref} {...inputProps} />
      <ParkSwitch.Control>
        <ParkSwitch.Thumb>
          {thumbLabel && (
            <ParkSwitch.ThumbIndicator fallback={thumbLabel?.off}>
              {thumbLabel?.on}
            </ParkSwitch.ThumbIndicator>
          )}
        </ParkSwitch.Thumb>
        {trackLabel && (
          <ParkSwitch.Indicator fallback={trackLabel.off}>{trackLabel.on}</ParkSwitch.Indicator>
        )}
      </ParkSwitch.Control>
      {children != null && <ParkSwitch.Label>{children}</ParkSwitch.Label>}
    </ParkSwitch.Root>
  )
})

```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `variant` | 'solid' | `'solid'` |
| `size` | 'md' | `'xs' | 'sm' | 'md' | 'lg'` |
| `value` | \on\ | `string | number`<br/>The value of switch input. Useful for form submission. |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `checked` | - | `boolean`<br/>The controlled checked state of the switch |
| `disabled` | - | `boolean`<br/>Whether the switch is disabled. |
| `ids` | - | `Partial<{ root: string; hiddenInput: string; control: string; label: string; thumb: string }>`<br/>The ids of the elements in the switch. Useful for composition. |
| `invalid` | - | `boolean`<br/>If `true`, the switch is marked as invalid. |
| `label` | - | `string`<br/>Specifies the localized strings that identifies the accessibility elements and their states |
| `name` | - | `string`<br/>The name of the input field in a switch
(Useful for form submission). |
| `onCheckedChange` | - | `(details: CheckedChangeDetails) => void`<br/>Function to call when the switch is clicked. |
| `readOnly` | - | `boolean`<br/>Whether the switch is read-only |
| `required` | - | `boolean`<br/>If `true`, the switch input is marked as required, |

# Tags Input

A form control for adding and removing multiple tags or labels.

```tsx
import { Span, TagsInput } from '@/components/ui'

export const App = () => {
  return (
    <TagsInput.Root defaultValue={['React', 'Solid', 'Vue']}>
      <TagsInput.Label>Tags</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add tag..." />
      </TagsInput.Control>
      <Span textStyle="xs" color="fg.muted" ms="auto">
        Press Enter or Return to add tag
      </Span>
    </TagsInput.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Tags-input component to your project:

```bash
npx @park-ui/cli add tags-input
```

## Usage

```tsx
import { TagsInput } from '@/components/ui'
```

```tsx
<TagsInput.Root>
  <TagsInput.Label />
  <TagsInput.Control>
    <TagsInput.Item>
      <TagsInput.ItemPreview>
        <TagsInput.ItemText />
        <TagsInput.ItemDeleteTrigger />
      </TagsInput.ItemPreview>
      <TagsInput.ItemInput />
    </TagsInput.Item>
    <TagsInput.Input />
  </TagsInput.Control>
</TagsInput.Root>
```


## Shortcuts

The `TagsInput` component also provides a set of shortcuts for common use cases.

### TagsInputItems

The `TagsInputItems` shortcut renders all tag items automatically based on the current value.

```tsx
<TagsInput.Context>
  {({ value }) =>
    value.map((tag, index) => (
      <TagsInput.Item key={index} index={index} value={tag}>
        <TagsInput.ItemPreview>
          <TagsInput.ItemText>{tag}</TagsInput.ItemText>
          <TagsInput.ItemDeleteTrigger />
        </TagsInput.ItemPreview>
        <TagsInput.ItemInput />
      </TagsInput.Item>
    ))
  }
</TagsInput.Context>
```

This might be more concise, if you don't need to customize the items:

```tsx
<TagsInput.Items />
```

## Examples

### Sizes

Use the `size` prop to adjust the size of the tags input.

```tsx
import { Stack } from 'styled-system/jsx'
import { TagsInput } from '@/components/ui'

export const App = () => {
  const sizes = ['xs', 'sm', 'md', 'lg'] as const
  return (
    <Stack gap="4">
      {sizes.map((size) => (
        <TagsInput.Root key={size} size={size} defaultValue={['React', 'Solid', 'Vue']}>
          <TagsInput.Label>Tags</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="Add tag..." />
          </TagsInput.Control>
        </TagsInput.Root>
      ))}
    </Stack>
  )
}

```

### Variants

Use the `variant` prop to change the visual style of the tags input.

```tsx
import { Stack } from 'styled-system/jsx'
import { TagsInput } from '@/components/ui'

export const App = () => {
  const variants = ['outline', 'subtle', 'surface'] as const
  return (
    <Stack gap="4">
      {variants.map((variant) => (
        <TagsInput.Root key={variant} variant={variant} defaultValue={['React', 'Solid', 'Vue']}>
          <TagsInput.Label>Tags</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="Add tag..." />
          </TagsInput.Control>
        </TagsInput.Root>
      ))}
    </Stack>
  )
}

```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `variant` | 'outline' | `'outline' | 'subtle' | 'surface'` |
| `size` | 'md' | `'xs' | 'sm' | 'md' | 'lg'` |
| `addOnPaste` | false | `boolean`<br/>Whether to add a tag when you paste values into the tag input |
| `delimiter` | \,\ | `string | RegExp`<br/>The character that serves has:
- event key to trigger the addition of a new tag
- character used to split tags when pasting into the input |
| `editable` | true | `boolean`<br/>Whether a tag can be edited after creation, by pressing `Enter` or double clicking. |
| `max` | Infinity | `number`<br/>The max number of tags |
| `allowOverflow` | - | `boolean`<br/>Whether to allow tags to exceed max. In this case,
we'll attach `data-invalid` to the root |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `autoFocus` | - | `boolean`<br/>Whether the input should be auto-focused |
| `blurBehavior` | - | `'clear' | 'add'`<br/>The behavior of the tags input when the input is blurred
- `"add"`: add the input value as a new tag
- `"clear"`: clear the input value |
| `defaultInputValue` | - | `string`<br/>The initial tag input value when rendered.
Use when you don't need to control the tag input value. |
| `defaultValue` | - | `string[]`<br/>The initial tag value when rendered.
Use when you don't need to control the tag value. |
| `disabled` | - | `boolean`<br/>Whether the tags input should be disabled |
| `form` | - | `string`<br/>The associate form of the underlying input element. |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{
  root: string
  input: string
  hiddenInput: string
  clearBtn: string
  label: string
  control: string
  item: (opts: ItemProps) => string
  itemDeleteTrigger: (opts: ItemProps) => string
  itemInput: (opts: ItemProps) => string
}>`<br/>The ids of the elements in the tags input. Useful for composition. |
| `inputValue` | - | `string`<br/>The controlled tag input's value |
| `invalid` | - | `boolean`<br/>Whether the tags input is invalid |
| `maxLength` | - | `number`<br/>The max length of the input. |
| `name` | - | `string`<br/>The name attribute for the input. Useful for form submissions |
| `onFocusOutside` | - | `(event: FocusOutsideEvent) => void`<br/>Function called when the focus is moved outside the component |
| `onHighlightChange` | - | `(details: HighlightChangeDetails) => void`<br/>Callback fired when a tag is highlighted by pointer or keyboard navigation |
| `onInputValueChange` | - | `(details: InputValueChangeDetails) => void`<br/>Callback fired when the input value is updated |
| `onInteractOutside` | - | `(event: InteractOutsideEvent) => void`<br/>Function called when an interaction happens outside the component |
| `onPointerDownOutside` | - | `(event: PointerDownOutsideEvent) => void`<br/>Function called when the pointer is pressed down outside the component |
| `onValueChange` | - | `(details: ValueChangeDetails) => void`<br/>Callback fired when the tag values is updated |
| `onValueInvalid` | - | `(details: ValidityChangeDetails) => void`<br/>Callback fired when the max tag count is reached or the `validateTag` function returns `false` |
| `readOnly` | - | `boolean`<br/>Whether the tags input should be read-only |
| `required` | - | `boolean`<br/>Whether the tags input is required |
| `translations` | - | `IntlTranslations`<br/>Specifies the localized strings that identifies the accessibility elements and their states |
| `validate` | - | `(details: ValidateArgs) => boolean`<br/>Returns a boolean that determines whether a tag can be added.
Useful for preventing duplicates or invalid tag values. |
| `value` | - | `string[]`<br/>The controlled tag value |

### Item

| Prop | Default | Type |
| --- | --- | --- |
| `index`* | - | `string | number` |
| `value`* | - | `string` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `disabled` | - | `boolean` |

# Textarea

A form input component for entering multi-line text.

```tsx
import { Textarea } from '@/components/ui'

export const App = () => {
  return <Textarea placeholder="Enter your comment" />
}

```

## Installation

Use the Park UI CLI to add the Textarea component to your project:

```bash
npx @park-ui/cli add textarea
```

## Usage

```tsx
import { Textarea } from '@/components/ui'
```

```tsx
<Textarea placeholder="Enter your message" />
```

## Examples

### Variants

Use the `variant` prop to change the visual style of the textarea.

```tsx
import { Stack } from 'styled-system/jsx'
import { Textarea } from '@/components/ui'

export const App = () => {
  const variants = ['outline', 'subtle', 'surface', 'flushed'] as const
  return (
    <Stack gap="4">
      {variants.map((variant) => (
        <Textarea key={variant} placeholder={variant} variant={variant} />
      ))}
    </Stack>
  )
}

```

### Sizes

Use the `size` prop to change the size of the textarea.

```tsx
import { Stack } from 'styled-system/jsx'
import { Textarea } from '@/components/ui'

export const App = () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

  return (
    <Stack gap="4">
      {sizes.map((size, index) => (
        <Textarea key={size} placeholder={`size (${size})`} size={size} rows={index + 1} />
      ))}
    </Stack>
  )
}

```

### Resize

Use the `resize` prop to control the resize behavior of the textarea.

```tsx
import { Stack } from 'styled-system/jsx'
import { Textarea } from '@/components/ui'

export const App = () => {
  return (
    <Stack gap="4" maxW="50%">
      <Textarea resize="none" placeholder="none" />
      <Textarea resize="vertical" placeholder="vertical" />
      <Textarea resize="horizontal" placeholder="horizontal" />
      <Textarea resize="both" placeholder="both" />
    </Stack>
  )
}

```

To limit the maximum height (or rows) of the textarea, we recommend using the `maxHeight` prop and setting the value to a `lh` unit.

```tsx
<Textarea maxH="5lh" />
```
### Autoresize

Use the `autoresize` prop to make the textarea autoresize vertically as you type.

```tsx
import { Textarea } from '@/components/ui'

export const App = () => {
  return <Textarea placeholder="autoresize" autoresize />
}

```

### Field

Compose the textarea with the `Field` component to add a label, helper text, and error message.

```tsx
import { Field, Textarea } from '@/components/ui'

export const App = () => {
  return (
    <Field.Root>
      <Field.Label>Comment</Field.Label>
      <Textarea placeholder="Enter your comment" />
      <Field.HelperText>A short comment about your experience with our product.</Field.HelperText>
    </Field.Root>
  )
}

```

### Required

Pass the `required` prop to `Field.Root` and use the `Field.RequiredIndicator` to indicate that the textarea is required.

```tsx
import { Field, Textarea } from '@/components/ui'

export const App = () => {
  return (
    <Field.Root required>
      <Field.Label>
        Comment <Field.RequiredIndicator />
      </Field.Label>
      <Textarea placeholder="Enter your comment" />
    </Field.Root>
  )
}

```

### Invalid

Pass the `invalid` prop to the `Field.Root` and use the `Field.ErrorText` to indicate that the textarea is invalid.

```tsx
import { Field, Textarea } from '@/components/ui'

export const App = () => {
  return (
    <Field.Root invalid>
      <Field.Label>Comment</Field.Label>
      <Textarea placeholder="Enter your comment" />
      <Field.ErrorText>There was an error with your submission</Field.ErrorText>
    </Field.Root>
  )
}

```

### Ref

Here's how to access the underlying element reference

```tsx
'use client'
import { useRef } from 'react'
import { Textarea } from '@/components/ui'

export const App = () => {
  const ref = useRef<HTMLTextAreaElement>(null)
  return <Textarea ref={ref} />
}

```

## Props

| Prop | Default | Type |
| --- | --- | --- |
| `variant` | 'surface' | `'outline' | 'surface' | 'subtle' | 'flushed'` |
| `size` | 'md' | `'xs' | 'sm' | 'md' | 'lg' | 'xl'` |

# Toggle Group

A form input component for selecting multiple options from a set.

```tsx
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react'
import { ButtonGroup, IconButton, ToggleGroup } from '@/components/ui'

export const App = () => {
  return (
    <ToggleGroup.Root defaultValue={['left']} asChild>
      <ButtonGroup variant="outline" attached>
        <ToggleGroup.Item value="left" asChild>
          <IconButton aria-label="Align Left">
            <AlignLeftIcon />
          </IconButton>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="center" asChild>
          <IconButton aria-label="Align Center">
            <AlignCenterIcon />
          </IconButton>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="right" asChild>
          <IconButton aria-label="Align Right">
            <AlignRightIcon />
          </IconButton>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="justify" asChild>
          <IconButton aria-label="Align Justify">
            <AlignJustifyIcon />
          </IconButton>
        </ToggleGroup.Item>
      </ButtonGroup>
    </ToggleGroup.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Toggle-group component to your project:

```bash
npx @park-ui/cli add toggle-group
```

## Usage

```tsx
import { ToggleGroup } from '@/components/ui'
```

```tsx
<ToggleGroup.Root>
  <ToggleGroup.Item />
</ToggleGroup.Root>
```

## Examples

### Multiple

Use the `multiple` prop to allow multiple items to be selected at once.

```tsx
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'
import { ButtonGroup, IconButton, ToggleGroup } from '@/components/ui'

export const App = () => {
  return (
    <ToggleGroup.Root defaultValue={['bold', 'underline']} multiple asChild>
      <ButtonGroup variant="outline" attached>
        <ToggleGroup.Item value="bold" asChild>
          <IconButton aria-label="Toggle Bold">
            <BoldIcon />
          </IconButton>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="italic" asChild>
          <IconButton aria-label="Toggle Italic">
            <ItalicIcon />
          </IconButton>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="underline" asChild>
          <IconButton aria-label="Toggle Underline">
            <UnderlineIcon />
          </IconButton>
        </ToggleGroup.Item>
      </ButtonGroup>
    </ToggleGroup.Root>
  )
}

```

### Toolbar

Here is an a toggle group used as a toolbar with icon buttons.

```tsx
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react'
import { ButtonGroup, IconButton, ToggleGroup } from '@/components/ui'

export const App = () => {
  return (
    <ToggleGroup.Root defaultValue={['left']} variant="outline" asChild>
      <ButtonGroup variant="plain" size="sm">
        <ToggleGroup.Item value="left" asChild>
          <IconButton aria-label="Align Left">
            <AlignLeftIcon />
          </IconButton>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="center" asChild>
          <IconButton aria-label="Align Center">
            <AlignCenterIcon />
          </IconButton>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="right" asChild>
          <IconButton aria-label="Align Right">
            <AlignRightIcon />
          </IconButton>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="justify" asChild>
          <IconButton aria-label="Align Justify">
            <AlignJustifyIcon />
          </IconButton>
        </ToggleGroup.Item>
      </ButtonGroup>
    </ToggleGroup.Root>
  )
}

```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `deselectable` | true | `boolean`<br/>Whether the toggle group allows empty selection.
**Note:** This is ignored if `multiple` is `true`. |
| `loopFocus` | true | `boolean`<br/>Whether to loop focus inside the toggle group. |
| `orientation` | \horizontal\ | `Orientation`<br/>The orientation of the toggle group. |
| `rovingFocus` | true | `boolean`<br/>Whether to use roving tab index to manage focus. |
| `variant` | - | `'outline'` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `defaultValue` | - | `string[]`<br/>The initial selected value of the toggle group when rendered.
Use when you don't need to control the selected value of the toggle group. |
| `disabled` | - | `boolean`<br/>Whether the toggle is disabled. |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{ root: string; item: (value: string) => string }>`<br/>The ids of the elements in the toggle. Useful for composition. |
| `multiple` | - | `boolean`<br/>Whether to allow multiple toggles to be selected. |
| `onValueChange` | - | `(details: ValueChangeDetails) => void`<br/>Function to call when the toggle is clicked. |
| `value` | - | `string[]`<br/>The controlled selected value of the toggle group. |

### Item

| Prop | Default | Type |
| --- | --- | --- |
| `value`* | - | `string` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `disabled` | - | `boolean` |

# Absolute Center

A utility component for centering content within its parent container.

```tsx
import { Box } from 'styled-system/jsx'
import { AbsoluteCenter } from '@/components/ui'

export const App = () => {
  return (
    <Box position="relative" height="40">
      <AbsoluteCenter>
        <Box bg="gray.surface.bg" p="4" borderRadius="l2" boxShadow="md">
          Centered Content
        </Box>
      </AbsoluteCenter>
    </Box>
  )
}

```

## Installation

Use the Park UI CLI to add the Absolute-center component to your project:

```bash
npx @park-ui/cli add absolute-center
```

## Usage

```tsx
import { AbsoluteCenter } from '@/components/ui'
```

```tsx
<AbsoluteCenter>Content</AbsoluteCenter>
```

## Props

| Prop | Default | Type |
| --- | --- | --- |
| `axis` | 'both' | `'horizontal' | 'vertical' | 'both'` |

# Group

A layout component for grouping related elements visually.

```tsx
import { Button, Group } from '@/components/ui'

export const App = () => {
  return (
    <Group>
      <Button variant="outline">First</Button>
      <Button variant="outline">Second</Button>
      <Button variant="outline">Third</Button>
    </Group>
  )
}

```

## Installation

Use the Park UI CLI to add the Group component to your project:

```bash
npx @park-ui/cli add group
```

## Usage

```tsx
import { Group } from '@/components/ui'
```

```tsx
<Group>
  <div />
  <div />
</Group>
```

## Examples

### Attached

Use the `attached` prop to attach the children together.

```tsx
import { Stack } from 'styled-system/jsx'
import { Badge, Button, Group } from '@/components/ui'

export const App = () => {
  return (
    <Stack gap="6">
      <Group attached>
        <Button variant="outline">Item 1</Button>
        <Button variant="outline">Item 2</Button>
      </Group>
      <Group attached>
        <Badge variant="solid">Commit status</Badge>
        <Badge variant="surface">90+</Badge>
      </Group>
    </Stack>
  )
}

```

### Grow

Use the `grow` prop to make the children grow to fill the available space.

```tsx
import { Button, Group } from '@/components/ui'

export const App = () => {
  return (
    <Group grow>
      <Button variant="outline">First</Button>
      <Button variant="outline">Second</Button>
      <Button variant="outline">Third</Button>
    </Group>
  )
}

```

### Vertical

Use the `orientation` prop to change the orientation of the group.

```tsx
import { Button, Group } from '@/components/ui'

export const App = () => {
  return (
    <Group orientation="vertical" attached>
      <Button variant="outline">First</Button>
      <Button variant="outline">Second</Button>
      <Button variant="outline">Third</Button>
    </Group>
  )
}

```

## Props

| Prop | Default | Type |
| --- | --- | --- |
| `orientation` | 'horizontal' | `'horizontal' | 'vertical'` |
| `attached` | - | `boolean` |
| `grow` | - | `boolean` |

# Scroll Area

A container component with customizable scrollbars for overflowing content.

```tsx
import { loremIpsum } from 'lorem-ipsum'
import { ScrollArea } from '@/components/ui'

export const App = () => {
  return (
    <ScrollArea.Root height="36">
      <ScrollArea.Viewport>
        <ScrollArea.Content
          spaceY="3"
          textStyle="sm"
          dangerouslySetInnerHTML={{
            __html: loremIpsum({ count: 10, format: 'html', units: 'paragraphs' }),
          }}
        />
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar />
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Scroll-area component to your project:

```bash
npx @park-ui/cli add scroll-area
```

## Usage

```tsx
import { ScrollArea } from '@/components/ui'
```

```tsx
<ScrollArea.Root>
  <ScrollArea.Viewport>
    <ScrollArea.Content />
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar>
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
  <ScrollArea.Corner />
</ScrollArea.Root>
```

## Examples

### Visibility

Use the `scrollbar` prop to change the scrollbar visibility behavior.

```tsx
import { loremIpsum } from 'lorem-ipsum'
import { Stack } from 'styled-system/jsx'
import { Heading, ScrollArea } from '@/components/ui'

export const App = () => {
  const variants = ['auto', 'visible'] as const
  return (
    <Stack gap="6">
      {variants.map((variant) => (
        <Stack key={variant}>
          <Heading as="h3">Scrollbar: {variant}</Heading>
          <ScrollArea.Root height="36" scrollbar={variant}>
            <ScrollArea.Viewport>
              <ScrollArea.Content
                spaceY="3"
                textStyle="sm"
                dangerouslySetInnerHTML={{
                  __html: loremIpsum({ count: 10, format: 'html', units: 'paragraphs' }),
                }}
              />
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar />
            <ScrollArea.Corner />
          </ScrollArea.Root>
        </Stack>
      ))}
    </Stack>
  )
}

```

### Sizes

Use the `size` prop to change the size of the scroll area. This affects the scrollbar thickness and content padding.

```tsx
import { loremIpsum } from 'lorem-ipsum'
import { Stack } from 'styled-system/jsx'
import { Heading, ScrollArea } from '@/components/ui'

export const App = () => {
  const sizes = ['xs', 'sm', 'md', 'lg'] as const
  return (
    <Stack gap="6">
      {sizes.map((size) => (
        <Stack key={size}>
          <Heading as="h3">Size: {size}</Heading>
          <ScrollArea.Root height="36" size={size} scrollbar="visible">
            <ScrollArea.Viewport>
              <ScrollArea.Content
                spaceY="3"
                textStyle="sm"
                dangerouslySetInnerHTML={{
                  __html: loremIpsum({
                    count: 10,
                    format: 'html',
                    units: 'paragraphs',
                  }),
                }}
              />
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar />
            <ScrollArea.Corner />
          </ScrollArea.Root>
        </Stack>
      ))}
    </Stack>
  )
}

```

### Horizontal

The scroll area automatically supports horizontal scrolling when content overflows horizontally.

```tsx
import { Center, HStack } from 'styled-system/jsx'
import { ScrollArea } from '@/components/ui'

export const App = () => (
  <ScrollArea.Root scrollbar="visible">
    <ScrollArea.Viewport pb="1">
      <ScrollArea.Content>
        <HStack gap="3">
          {Array.from({ length: 12 }, (_, i) => (
            <Center key={i} h="20" w="40" bg="gray.subtle.bg" borderRadius="l2">
              {i + 1}
            </Center>
          ))}
        </HStack>
      </ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar orientation="horizontal" />
    <ScrollArea.Corner />
  </ScrollArea.Root>
)

```

### Virtualization

Use `@tanstack/react-virtual` to handle large datasets efficiently by rendering only visible items.

```tsx
'use client'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'
import { Box, Center } from 'styled-system/jsx'
import { ScrollArea } from '@/components/ui'

export const App = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: 200,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 40,
    gap: 8,
  })

  return (
    <ScrollArea.Root height="72">
      <ScrollArea.Viewport ref={scrollRef}>
        <ScrollArea.Content>
          <Box
            position="relative"
            width="full"
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem) => (
              <Center
                key={virtualItem.key}
                bg="gray.subtle.bg"
                position="absolute"
                inset="0"
                style={{
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                Item #{virtualItem.index}
              </Center>
            ))}
          </Box>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}

```

### Infinite Scroll

Here is an example of implementing infinite scroll with the scroll area component.

```tsx
'use client'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useRef, useState } from 'react'
import { Box, Center } from 'styled-system/jsx'
import { ScrollArea } from '@/components/ui'

export const App = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState(() => Array.from({ length: 20 }, (_, i) => `Item #${i + 1}`))
  const [isLoading, setIsLoading] = useState(false)

  const hasMore = items.length < 200

  const rowVirtualizer = useVirtualizer({
    count: hasMore ? items.length + 1 : items.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 40,
    overscan: 5,
    gap: 8,
  })

  const virtualItems = rowVirtualizer.getVirtualItems()

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1]
    if (!lastItem || !hasMore || isLoading) return

    if (lastItem.index >= items.length - 1) {
      setIsLoading(true)
      setTimeout(() => {
        setItems((prev) => [
          ...prev,
          ...Array.from({ length: 20 }, (_, i) => `Item #${prev.length + i + 1}`),
        ])
        setIsLoading(false)
      }, 750)
    }
  }, [virtualItems, hasMore, isLoading, items.length])

  return (
    <ScrollArea.Root height="72">
      <ScrollArea.Viewport ref={scrollRef}>
        <ScrollArea.Content>
          <Box
            position="relative"
            width="full"
            style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
          >
            {virtualItems.map((virtualItem) => {
              const isLoaderRow = virtualItem.index > items.length - 1
              const item = items[virtualItem.index]

              return (
                <Center
                  key={virtualItem.key}
                  bg="gray.subtle.bg"
                  position="absolute"
                  inset="0"
                  style={{
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  {isLoaderRow ? (hasMore ? 'Loading more...' : 'Nothing more to load') : item}
                </Center>
              )
            })}
          </Box>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}

```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `scrollbar` | 'auto' | `'auto' | 'visible'` |
| `size` | 'md' | `'xs' | 'sm' | 'md' | 'lg'` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `ids` | - | `Partial<{ root: string; viewport: string; content: string; scrollbar: string; thumb: string }>`<br/>The ids of the scroll area elements |

### Scrollbar

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `orientation` | - | `Orientation` |

# Splitter

A layout component for creating resizable split panes and panels.

```tsx
import { Splitter } from '@/components/ui'

export const App = () => {
  return (
    <Splitter.Root panels={[{ id: 'a' }, { id: 'b' }]}>
      <Splitter.Panel id="a">A</Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
      <Splitter.Panel id="b">B</Splitter.Panel>
    </Splitter.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Splitter component to your project:

```bash
npx @park-ui/cli add splitter
```

## Usage

```tsx
import { Splitter } from '@/components/ui'
```

```tsx
<Splitter.Root>
  <Splitter.Panel />
  <Splitter.ResizeTrigger />
  <Splitter.Panel />
</Splitter.Root>
```

## Examples

### Collapsible

Set `collapsible` to true on a panel to make it collapsible. Use `collapsedSize` to control its collapsed size. This can be useful for building sidebar layouts.

```tsx
import { Splitter } from '@/components/ui'

export const App = () => {
  return (
    <Splitter.Root
      defaultSize={[15, 20]}
      panels={[
        { id: 'a', collapsible: true, collapsedSize: 5, minSize: 25, maxSize: 25 },
        { id: 'b', minSize: 50 },
      ]}
    >
      <Splitter.Panel id="a">A</Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
      <Splitter.Panel id="b">B</Splitter.Panel>
    </Splitter.Root>
  )
}

```

### Vertical

Use the `orientation` prop to create a vertical splitter.

```tsx
import { Splitter } from '@/components/ui'

export const App = () => {
  return (
    <Splitter.Root panels={[{ id: 'a' }, { id: 'b' }]} orientation="vertical" minH="64">
      <Splitter.Panel id="a">A</Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
      <Splitter.Panel id="b">B</Splitter.Panel>
    </Splitter.Root>
  )
}

```

### Multiple

Here is an example  with multiple panels.

```tsx
import { Splitter } from '@/components/ui'

export const App = () => {
  return (
    <Splitter.Root
      panels={[
        { id: 'a', minSize: 20 },
        { id: 'b', minSize: 40 },
        { id: 'c', minSize: 20 },
      ]}
      defaultSize={[20, 60, 20]}
    >
      <Splitter.Panel id="a">A</Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize A and B" />
      <Splitter.Panel id="b">B</Splitter.Panel>
      <Splitter.ResizeTrigger id="b:c" aria-label="Resize B and C" />
      <Splitter.Panel id="c">C</Splitter.Panel>
    </Splitter.Root>
  )
}

```

### Store

Use the `useSplitter` hook to control the state of the splitter programmatically.

```tsx
'use client'
import { useSplitter } from '@ark-ui/react/splitter'
import { Stack } from 'styled-system/jsx'
import { Button, Splitter } from '@/components/ui'

export const App = () => {
  const splitter = useSplitter({
    defaultSize: [15, 20],
    panels: [
      { id: 'a', collapsible: true, collapsedSize: 5, minSize: 25, maxSize: 25 },
      { id: 'b', minSize: 50 },
    ],
  })

  return (
    <Stack gap="4" alignItems="start">
      <Button
        onClick={() =>
          splitter.isPanelCollapsed('a') ? splitter.expandPanel('a') : splitter.collapsePanel('a')
        }
        size="xs"
        variant="surface"
      >
        {splitter.isPanelCollapsed('a') ? 'Expand' : 'Collapse'} Panel A
      </Button>
      <Splitter.RootProvider value={splitter}>
        <Splitter.Panel id="a">A</Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
        <Splitter.Panel id="b">B</Splitter.Panel>
      </Splitter.RootProvider>
    </Stack>
  )
}

```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `panels`* | - | `PanelData[]`<br/>The size constraints of the panels. |
| `orientation` | \horizontal\ | `'horizontal' | 'vertical'`<br/>The orientation of the splitter. Can be `horizontal` or `vertical` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `defaultSize` | - | `number[]`<br/>The initial size of the panels when rendered.
Use when you don't need to control the size of the panels. |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{
  root: string
  resizeTrigger: (id: string) => string
  label: (id: string) => string
  panel: (id: string | number) => string
}>`<br/>The ids of the elements in the splitter. Useful for composition. |
| `keyboardResizeBy` | - | `number`<br/>The number of pixels to resize the panel by when the keyboard is used. |
| `nonce` | - | `string`<br/>The nonce for the injected splitter cursor stylesheet. |
| `onCollapse` | - | `(details: ExpandCollapseDetails) => void`<br/>Function called when a panel is collapsed. |
| `onExpand` | - | `(details: ExpandCollapseDetails) => void`<br/>Function called when a panel is expanded. |
| `onResize` | - | `(details: ResizeDetails) => void`<br/>Function called when the splitter is resized. |
| `onResizeEnd` | - | `(details: ResizeEndDetails) => void`<br/>Function called when the splitter resize ends. |
| `onResizeStart` | - | `() => void`<br/>Function called when the splitter resize starts. |
| `size` | - | `number[]`<br/>The controlled size data of the panels |

### Panel

| Prop | Default | Type |
| --- | --- | --- |
| `id`* | - | `string` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

### ResizeTrigger

| Prop | Default | Type |
| --- | --- | --- |
| `id`* | - | ``${string}:${string}`` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `disabled` | - | `boolean` |

# Link

A navigation component for creating accessible hyperlinks.

```tsx
import { Link } from '@/components/ui'

export const App = () => {
  return <Link href="https://park-ui.com">Visit Park UI</Link>
}

```

## Installation

Use the Park UI CLI to add the Link component to your project:

```bash
npx @park-ui/cli add link
```

## Usage

```tsx
import { Link } from '@/components/ui'
```

```tsx
<Link href="...">Click here</Link>
```

## Examples

### Variants

Use the `variant` prop to change the visual style of the Link component.

```tsx
import { Stack } from 'styled-system/jsx'
import { Link } from '@/components/ui'

export const App = () => {
  return (
    <Stack gap="4" align="start">
      <Link href="https://park-ui.com" variant="underline">
        Visit Park UI
      </Link>
      <Link href="https://park-ui.com" variant="plain">
        Visit Park UI
      </Link>
    </Stack>
  )
}

```

### Within Text

Integrate links within text content while maintaining readability.

```tsx
import { Link, Text } from '@/components/ui'

export const App = () => {
  return (
    <Text>
      Visit the <Link href="https://park-ui.com">Park UI</Link> website
    </Text>
  )
}

```

### Icon

Add visual indicators for external links to improve user experience.

```tsx
import { ExternalLinkIcon } from 'lucide-react'
import { Link } from '@/components/ui'

export const App = () => {
  return (
    <Link href="https://park-ui.com">
      Visit Park UI <ExternalLinkIcon />
    </Link>
  )
}

```

### Routing Library

Use the `asChild` prop to compose Link with framework-specific routing components like Next.js Link.

```tsx
import NextLink from 'next/link'
import { Link } from '@/components/ui'

export const App = () => {
  return (
    <Link asChild>
      <NextLink href="/about">Click here</NextLink>
    </Link>
  )
}
```

## Props

| Prop | Default | Type |
| --- | --- | --- |
| `variant` | 'underline' | `'underline' | 'plain'` |

# Pagination

A navigation component for browsing through pages of content.

```tsx
'use client'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { ButtonGroup, IconButton, Pagination } from '@/components/ui'

export const App = () => {
  return (
    <Pagination.Root count={20} pageSize={2} defaultPage={1}>
      <ButtonGroup variant="outline" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton colorPalette="gray">
            <ChevronLeftIcon />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.Items
          render={(page) =>
            page.selected ? (
              <IconButton variant="solid">{page.value}</IconButton>
            ) : (
              <IconButton variant="outline" colorPalette="gray">
                {page.value}
              </IconButton>
            )
          }
        />
        <Pagination.NextTrigger asChild>
          <IconButton colorPalette="gray">
            <ChevronRightIcon />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Pagination component to your project:

```bash
npx @park-ui/cli add pagination
```

## Usage

```tsx
import { Pagination } from '@/components/ui'
```

```tsx
<Pagination.Root>
  <Pagination.PrevTrigger />
  <Pagination.Ellipsis />
  <Pagination.Item />
  <Pagination.PageText />
  <Pagination.NextTrigger />
</Pagination.Root>
```

## Shortcuts

The `Pagination` component also provides a set of shortcuts for common use cases.

### PaginationItems

This component renders the number of pages based on the `count` and `pageSize` props. Rendering this:

```tsx
<Pagination.Items />
```

is shorthand for this:

```tsx
<Pagination.Context>
  {({ pages }) =>
    pages.map((page, index) =>
      page.type === "page" ? (
        <Pagination.Item key={index} {...page} />
      ) : (
        <Pagination.Ellipsis key={index} index={index} />
      ),
    )
  }
</Pagination.Context>
```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `defaultPage` | 1 | `number`<br/>The initial active page when rendered.
Use when you don't need to control the active page of the pagination. |
| `defaultPageSize` | 10 | `number`<br/>The initial number of data items per page when rendered.
Use when you don't need to control the page size of the pagination. |
| `siblingCount` | 1 | `number`<br/>Number of pages to show beside active page |
| `type` | \button\ | `'button' | 'link'`<br/>The type of the trigger element |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `count` | - | `number`<br/>Total number of data items |
| `getPageUrl` | - | `(details: PageUrlDetails) => string`<br/>Function to generate href attributes for pagination links.
Only used when `type` is set to "link". |
| `ids` | - | `Partial<{
  root: string
  ellipsis: (index: number) => string
  prevTrigger: string
  nextTrigger: string
  item: (page: number) => string
}>`<br/>The ids of the elements in the accordion. Useful for composition. |
| `onPageChange` | - | `(details: PageChangeDetails) => void`<br/>Called when the page number is changed |
| `onPageSizeChange` | - | `(details: PageSizeChangeDetails) => void`<br/>Called when the page size is changed |
| `page` | - | `number`<br/>The controlled active page |
| `pageSize` | - | `number`<br/>The controlled number of data items per page |
| `translations` | - | `IntlTranslations`<br/>Specifies the localized strings that identifies the accessibility elements and their states |

### Ellipsis

| Prop | Default | Type |
| --- | --- | --- |
| `index`* | - | `number` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

### Item

| Prop | Default | Type |
| --- | --- | --- |
| `type`* | - | `'page'` |
| `value`* | - | `number` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

# Tabs

A component for organizing content into switchable panels.

```tsx
import { Tabs } from '@/components/ui'

export const App = () => {
  return (
    <Tabs.Root defaultValue="react">
      <Tabs.List>
        <Tabs.Trigger value="react">React</Tabs.Trigger>
        <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
        <Tabs.Trigger value="svelte">Svelte</Tabs.Trigger>
        <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="react">Know React? Check out Solid!</Tabs.Content>
      <Tabs.Content value="solid">Know Solid? Check out Svelte!</Tabs.Content>
      <Tabs.Content value="svelte">Know Solid? Check out Vue!</Tabs.Content>
      <Tabs.Content value="vue">Know Vue? Check out React!</Tabs.Content>
    </Tabs.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Tabs component to your project:

```bash
npx @park-ui/cli add tabs
```

## Usage

```tsx
import { Tabs } from '@/components/ui'
```

```tsx
<Tabs.Root>
  <Tabs.List>
    <Tabs.Trigger />
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content />
</Tabs.Root>
```

## Examples

Use the `size` prop to change the size of the tabs.

```tsx
import { Stack } from 'styled-system/jsx'
import { Tabs } from '@/components/ui'

export const App = () => {
  const sizes = ['sm', 'md', 'lg'] as const

  return (
    <Stack gap="4">
      {sizes.map((size) => (
        <Tabs.Root defaultValue="react" size={size} key={size}>
          <Tabs.List>
            <Tabs.Trigger value="react">React</Tabs.Trigger>
            <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
            <Tabs.Trigger value="svelte">Svelte</Tabs.Trigger>
            <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="react" />
          <Tabs.Content value="solid" />
          <Tabs.Content value="svelte" />
          <Tabs.Content value="vue" />
        </Tabs.Root>
      ))}
    </Stack>
  )
}

```

### Variants

Use the `variant` prop to change the appearance of the tabs.

```tsx
import { Stack } from 'styled-system/jsx'
import { Tabs } from '@/components/ui'

export const App = () => {
  const variants = ['line', 'subtle', 'enclosed'] as const

  return (
    <Stack gap="4">
      {variants.map((variant) => (
        <Tabs.Root defaultValue="react" variant={variant} key={variant}>
          <Tabs.List>
            <Tabs.Trigger value="react">React</Tabs.Trigger>
            <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
            <Tabs.Trigger value="svelte">Svelte</Tabs.Trigger>
            <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="react" />
          <Tabs.Content value="solid" />
          <Tabs.Content value="svelte" />
          <Tabs.Content value="vue" />
        </Tabs.Root>
      ))}
    </Stack>
  )
}

```

### Orientation

Use the `orientation` prop to change the orientation of the tabs.

```tsx
import { Tabs } from '@/components/ui'

export const App = () => {
  return (
    <Tabs.Root defaultValue="react" orientation="vertical" variant="line">
      <Tabs.List>
        <Tabs.Trigger value="react">React</Tabs.Trigger>
        <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
        <Tabs.Trigger value="svelte">Svelte</Tabs.Trigger>
        <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="react" />
      <Tabs.Content value="solid" />
      <Tabs.Content value="svelte" />
      <Tabs.Content value="vue" />
    </Tabs.Root>
  )
}

```

### Lazy Loading

Optimize performance by using the `lazyMount` and `unmountOnExit` props to conditionally render tab content. 

```tsx
'use client'
import { useEffect, useState } from 'react'
import { Tabs } from '@/components/ui'

export const App = () => {
  return (
    <Tabs.Root lazyMount unmountOnExit defaultValue="tab-1">
      <Tabs.List>
        <Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab-3">Tab 3</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="tab-1">
        Tab 1: Content <TickValue />
      </Tabs.Content>
      <Tabs.Content value="tab-2">
        Tab 2: Content <TickValue />
      </Tabs.Content>
      <Tabs.Content value="tab-3">
        Tab 3: Content <TickValue />
      </Tabs.Content>
    </Tabs.Root>
  )
}

const TickValue = () => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setValue((v) => v + 1)
    }, 1000)
    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  return <span style={{ fontWeight: 'bold', color: 'tomato', padding: 4 }}>{value}</span>
}

```

### Fitted

Use the `fitted` prop to make the tabs fit the width of the container.

```tsx
import { Stack } from 'styled-system/jsx'
import { Tabs } from '@/components/ui'

export const App = () => {
  const variants = ['line', 'subtle', 'enclosed'] as const

  return (
    <Stack gap="4">
      {variants.map((variant) => (
        <Tabs.Root defaultValue="react" variant={variant} key={variant} fitted>
          <Tabs.List>
            <Tabs.Trigger value="react">React</Tabs.Trigger>
            <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
            <Tabs.Trigger value="svelte">Svelte</Tabs.Trigger>
            <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="react" />
          <Tabs.Content value="solid" />
          <Tabs.Content value="svelte" />
          <Tabs.Content value="vue" />
        </Tabs.Root>
      ))}
    </Stack>
  )
}

```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `size` | 'md' | `'xs' | 'sm' | 'md' | 'lg'` |
| `variant` | 'line' | `'line' | 'subtle' | 'enclosed'` |
| `activationMode` | \automatic\ | `'manual' | 'automatic'`<br/>The activation mode of the tabs. Can be `manual` or `automatic`
- `manual`: Tabs are activated when clicked or press `enter` key.
- `automatic`: Tabs are activated when receiving focus |
| `lazyMount` | false | `boolean`<br/>Whether to enable lazy mounting |
| `loopFocus` | true | `boolean`<br/>Whether the keyboard navigation will loop from last tab to first, and vice versa. |
| `orientation` | \horizontal\ | `'horizontal' | 'vertical'`<br/>The orientation of the tabs. Can be `horizontal` or `vertical`
- `horizontal`: only left and right arrow key navigation will work.
- `vertical`: only up and down arrow key navigation will work. |
| `unmountOnExit` | false | `boolean`<br/>Whether to unmount on exit. |
| `fitted` | - | `boolean` |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `composite` | - | `boolean`<br/>Whether the tab is composite |
| `defaultValue` | - | `string`<br/>The initial selected tab value when rendered.
Use when you don't need to control the selected tab value. |
| `deselectable` | - | `boolean`<br/>Whether the active tab can be deselected when clicking on it. |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{
  root: string
  trigger: (value: string) => string
  list: string
  content: (value: string) => string
  indicator: string
}>`<br/>The ids of the elements in the tabs. Useful for composition. |
| `navigate` | - | `(details: NavigateDetails) => void`<br/>Function to navigate to the selected tab when clicking on it.
Useful if tab triggers are anchor elements. |
| `onFocusChange` | - | `(details: FocusChangeDetails) => void`<br/>Callback to be called when the focused tab changes |
| `onValueChange` | - | `(details: ValueChangeDetails) => void`<br/>Callback to be called when the selected/active tab changes |
| `translations` | - | `IntlTranslations`<br/>Specifies the localized strings that identifies the accessibility elements and their states |
| `value` | - | `string`<br/>The controlled selected tab value |

### TabContent

| Prop | Default | Type |
| --- | --- | --- |
| `value`* | - | `string`<br/>The value of the tab |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |

### TabTrigger

| Prop | Default | Type |
| --- | --- | --- |
| `value`* | - | `string`<br/>The value of the tab |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `disabled` | - | `boolean`<br/>Whether the tab is disabled |

# Dialog

A modal component for displaying important content requiring user response.

```tsx
'use client'
import { Portal } from '@ark-ui/react/portal'
import { Button, CloseButton, Dialog } from '@/components/ui'

export const App = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Open Dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Title</Dialog.Title>
              <Dialog.Description>Description</Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>{/* Content */}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button>Save</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Dialog component to your project:

```bash
npx @park-ui/cli add dialog
```

## Usage

```tsx
import { Dialog } from '@/components/ui'
```

```tsx
<Dialog.Root>
  <Dialog.Trigger />
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.CloseTrigger />
      <Dialog.Header>
        <Dialog.Title />
        <Dialog.Description />
      </Dialog.Header>
      <Dialog.Body />
      <Dialog.Footer>
        <Dialog.ActionTrigger />
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```

## Examples

Use the `size` prop to change the size of the dialog component.

```tsx
import { Portal } from '@ark-ui/react/portal'
import { Wrap } from 'styled-system/jsx'
import { Button, CloseButton, Dialog } from '@/components/ui'

export const App = () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

  return (
    <Wrap gap="4">
      {sizes.map((size) => (
        <Dialog.Root key={size} size={size}>
          <Dialog.Trigger asChild>
            <Button variant="outline">Open ({size})</Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Title</Dialog.Title>
                  <Dialog.Description>Description</Dialog.Description>
                </Dialog.Header>
                <Dialog.Body>{/* Content */}</Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Dialog.ActionTrigger asChild>
                    <Button>Save</Button>
                  </Dialog.ActionTrigger>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      ))}
    </Wrap>
  )
}

```

### Cover

Use the `size="cover"` prop to make the dialog component cover the entire screen while revealing a small portion of the page behind.

```tsx
import { Portal } from '@ark-ui/react/portal'
import { Button, CloseButton, Dialog } from '@/components/ui'

export const App = () => {
  return (
    <Dialog.Root size="cover">
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Title</Dialog.Title>
              <Dialog.Description>Description</Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>{/* Content */}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button>Save</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

```

### Fullscreen

Use the `size="full"` prop to make the dialog component take up the entire screen.

```tsx
import { Portal } from '@ark-ui/react/portal'
import { Button, CloseButton, Dialog } from '@/components/ui'

export const App = () => {
  return (
    <Dialog.Root size="full">
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Title</Dialog.Title>
              <Dialog.Description>Description</Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>{/* Content */}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button>Save</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

```

### Responsive Size

Use responsive values for the `size` prop to make the dialog adapt to different screen sizes.
We recommend using exact breakpoints values instead of using a base to ensure styles are properly contained.

```tsx
import { Portal } from '@ark-ui/react/portal'
import { Button, CloseButton, Dialog } from '@/components/ui'

export const App = () => {
  return (
    <Dialog.Root size={{ mdDown: 'full', md: 'lg' }}>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Title</Dialog.Title>
              <Dialog.Description>Description</Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>{/* Content */}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button>Save</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

```

### Placements

Use the `placement` prop to change the placement of the dialog component.

```tsx
import { Portal } from '@ark-ui/react/portal'
import { Wrap } from 'styled-system/jsx'
import { Button, CloseButton, Dialog } from '@/components/ui'

export const App = () => {
  const placements = ['top', 'center', 'bottom'] as const

  return (
    <Wrap gap="4">
      {placements.map((placement) => (
        <Dialog.Root key={placement} placement={placement}>
          <Dialog.Trigger asChild>
            <Button variant="outline">Open Dialog ({placement})</Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Title</Dialog.Title>
                  <Dialog.Description>Description</Dialog.Description>
                </Dialog.Header>
                <Dialog.Body>{/* Content */}</Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Dialog.ActionTrigger asChild>
                    <Button>Save</Button>
                  </Dialog.ActionTrigger>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      ))}
    </Wrap>
  )
}

```

### Controlled

Use the `open` and `onOpenChange` prop to control the visibility of the dialog component.

```tsx
'use client'
import { Portal } from '@ark-ui/react/portal'
import { useState } from 'react'
import { Button, CloseButton, Dialog } from '@/components/ui'

export const App = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Title</Dialog.Title>
              <Dialog.Description>Description</Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>{/* Content */}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button>Save</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

```

### Nested Dialogs

You can nest dialogs by using the `Dialog.Root` component inside another `Dialog.Root` component.

```tsx
import { Portal } from '@ark-ui/react/portal'
import { Button, CloseButton, Dialog } from '@/components/ui'

export const App = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Title</Dialog.Title>
              <Dialog.Description>Description</Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>{/* Content */}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.Root size="sm">
                <Dialog.Trigger asChild>
                  <Button>Open Dialog</Button>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Title</Dialog.Title>
                        <Dialog.Description>Description</Dialog.Description>
                      </Dialog.Header>
                      <Dialog.Body>{/* Content */}</Dialog.Body>
                      <Dialog.CloseTrigger asChild>
                        <CloseButton />
                      </Dialog.CloseTrigger>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

```

### Initial Focus

Use the `initialFocusEl` prop to set the initial focus of the dialog component.

```tsx
'use client'
import { Portal } from '@ark-ui/react/portal'
import { useRef } from 'react'
import { Button, CloseButton, Dialog, Field, Input } from '@/components/ui'

export const App = () => {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <Dialog.Root initialFocusEl={() => ref.current}>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Title</Dialog.Title>
              <Dialog.Description>Description</Dialog.Description>
            </Dialog.Header>
            <Dialog.Body gap="4">
              <Field.Root>
                <Field.Label>First Name</Field.Label>
                <Input placeholder="First Name" />
              </Field.Root>
              <Field.Root>
                <Field.Label>Last Name</Field.Label>
                <Input ref={ref} placeholder="Last Name" />
              </Field.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button>Save</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

```

### Inside Scroll

Use the `scrollBehavior=inside` prop to change the scroll behavior of the dialog when its content overflows.

```tsx
import { Portal } from '@ark-ui/react/portal'
import { loremIpsum } from 'lorem-ipsum'
import { Button, CloseButton, Dialog } from '@/components/ui'

export const App = () => {
  return (
    <Dialog.Root scrollBehavior="inside">
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body
              color="fg.muted"
              dangerouslySetInnerHTML={{
                __html: loremIpsum({ count: 10, format: 'html', units: 'paragraphs' }),
              }}
            />
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button>Save</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

```

### Outside Scroll

Use the `scrollBehavior=outside` prop to change the scroll behavior of the dialog when its content overflows.

```tsx
import { Portal } from '@ark-ui/react/portal'
import { loremIpsum } from 'lorem-ipsum'
import { Button, CloseButton, Dialog } from '@/components/ui'

export const App = () => {
  return (
    <Dialog.Root scrollBehavior="outside">
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body
              color="fg.muted"
              dangerouslySetInnerHTML={{
                __html: loremIpsum({ count: 10, format: 'html', units: 'paragraphs' }),
              }}
            />
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button>Save</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

```

### Motion Preset

Use the `motionPreset` prop to change the animation of the dialog component.

```tsx
import { Portal } from '@ark-ui/react/portal'
import { Wrap } from 'styled-system/jsx'
import { Button, CloseButton, Dialog } from '@/components/ui'

export const App = () => {
  const presets = ['scale', 'slide-in-bottom', 'slide-in-top', 'none'] as const

  return (
    <Wrap gap="4">
      {presets.map((preset) => (
        <Dialog.Root key={preset} motionPreset={preset}>
          <Dialog.Trigger asChild>
            <Button variant="outline">{preset}</Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Title</Dialog.Title>
                  <Dialog.Description>Description</Dialog.Description>
                </Dialog.Header>
                <Dialog.Body>{/* Content */}</Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Dialog.ActionTrigger asChild>
                    <Button>Save</Button>
                  </Dialog.ActionTrigger>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      ))}
    </Wrap>
  )
}

```

### Alert Dialog

Set the `role: "alertdialog"` prop to change the dialog component to an alert
dialog.

```tsx
import { Portal } from '@ark-ui/react/portal'
import { Button, CloseButton, Dialog } from '@/components/ui'

export const App = () => {
  return (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Are you sure?</Dialog.Title>
              <Dialog.Description>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our systems.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button colorPalette="gray" variant="outline">
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button colorPalette="red">Delete</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

```

### Non-Modal Dialog

We don't recommend using a non-modal dialog due to the accessibility concerns
they present. In event you need it, here's what you can do:

- set the `modal` prop to `false`
- set `pointerEvents` to `none` on the `Dialog.Positioner` component
- (optional)set the `closeOnInteractOutside` prop to `false`

```tsx
import { Portal } from '@ark-ui/react/portal'
import { Button, CloseButton, Dialog } from '@/components/ui'

export const App = () => {
  return (
    <Dialog.Root closeOnInteractOutside={false} modal={false}>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Positioner pointerEvents="none">
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Title</Dialog.Title>
              <Dialog.Description>Description</Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>{/* Content */}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button>Save</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `motionPreset` | 'scale' | `'scale' | 'slide-in-bottom' | 'slide-in-top' | 'slide-in-left' | 'slide-in-right' | 'none'` |
| `size` | 'md' | `'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'cover' | 'full'` |
| `placement` | 'center' | `'center' | 'top' | 'bottom'` |
| `scrollBehavior` | 'outside' | `'inside' | 'outside'` |
| `closeOnEscape` | true | `boolean`<br/>Whether to close the dialog when the escape key is pressed |
| `closeOnInteractOutside` | true | `boolean`<br/>Whether to close the dialog when the outside is clicked |
| `defaultOpen` | false | `boolean`<br/>The initial open state of the dialog when rendered.
Use when you don't need to control the open state of the dialog. |
| `lazyMount` | false | `boolean`<br/>Whether to enable lazy mounting |
| `modal` | true | `boolean`<br/>Whether to prevent pointer interaction outside the element and hide all content below it |
| `preventScroll` | true | `boolean`<br/>Whether to prevent scrolling behind the dialog when it's opened |
| `role` | \dialog\ | `'dialog' | 'alertdialog'`<br/>The dialog's role |
| `skipAnimationOnMount` | false | `boolean`<br/>Whether to allow the initial presence animation. |
| `trapFocus` | true | `boolean`<br/>Whether to trap focus inside the dialog when it's opened |
| `unmountOnExit` | false | `boolean`<br/>Whether to unmount on exit. |
| `aria-label` | - | `string`<br/>Human readable label for the dialog, in event the dialog title is not rendered |
| `finalFocusEl` | - | `() => MaybeElement`<br/>Element to receive focus when the dialog is closed |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{
  trigger: string
  positioner: string
  backdrop: string
  content: string
  closeTrigger: string
  title: string
  description: string
}>`<br/>The ids of the elements in the dialog. Useful for composition. |
| `immediate` | - | `boolean`<br/>Whether to synchronize the present change immediately or defer it to the next frame |
| `initialFocusEl` | - | `() => MaybeElement`<br/>Element to receive focus when the dialog is opened |
| `onEscapeKeyDown` | - | `(event: KeyboardEvent) => void`<br/>Function called when the escape key is pressed |
| `onExitComplete` | - | `VoidFunction`<br/>Function called when the animation ends in the closed state |
| `onFocusOutside` | - | `(event: FocusOutsideEvent) => void`<br/>Function called when the focus is moved outside the component |
| `onInteractOutside` | - | `(event: InteractOutsideEvent) => void`<br/>Function called when an interaction happens outside the component |
| `onOpenChange` | - | `(details: OpenChangeDetails) => void`<br/>Function to call when the dialog's open state changes |
| `onPointerDownOutside` | - | `(event: PointerDownOutsideEvent) => void`<br/>Function called when the pointer is pressed down outside the component |
| `onRequestDismiss` | - | `(event: LayerDismissEvent) => void`<br/>Function called when this layer is closed due to a parent layer being closed |
| `open` | - | `boolean`<br/>The controlled open state of the dialog |
| `persistentElements` | - | `(() => Element | null)[]`<br/>Returns the persistent elements that:
- should not have pointer-events disabled
- should not trigger the dismiss event |
| `present` | - | `boolean`<br/>Whether the node is present (controlled by the user) |
| `restoreFocus` | - | `boolean`<br/>Whether to restore focus to the element that had focus before the dialog was opened |

# Hover Card

A popover component that displays content when hovering over an element.

```tsx
import { Portal } from '@ark-ui/react'
import { MapPinIcon } from 'lucide-react'
import { HStack, Stack } from 'styled-system/jsx'
import { Avatar, HoverCard, Icon, Link, Text } from '@/components/ui'

export const App = () => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <Link href="https://twitter.com/grizzly_codes/" target="_blank">
          @grizzly_codes
        </Link>
      </HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content>
            <HoverCard.Arrow>
              <HoverCard.ArrowTip />
            </HoverCard.Arrow>
            <Stack gap="4" direction="row">
              <Avatar.Root size="lg">
                <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056?v=4" />
                <Avatar.Fallback name="Christian Busch" />
              </Avatar.Root>
              <Stack gap="3">
                <Stack gap="1">
                  <Text textStyle="sm" fontWeight="semibold">
                    @grizzly_codes
                  </Text>
                  <Text textStyle="sm" color="fg.muted">
                    Principal Software Engineer working at Pyck.ai
                  </Text>
                </Stack>
                <HStack gap="1" color="fg.subtle">
                  <Icon size="sm">
                    <MapPinIcon />
                  </Icon>
                  <Text textStyle="xs">Joined Oktober 2025</Text>
                </HStack>
              </Stack>
            </Stack>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Hover-card component to your project:

```bash
npx @park-ui/cli add hover-card
```

## Usage

```tsx
import { HoverCard } from '@/components/ui'
```

```tsx
<HoverCard.Root>
  <HoverCard.Trigger />
  <HoverCard.Positioner>
    <HoverCard.Content>
      <HoverCard.Arrow>
        <HoverCard.ArrowTip />
      </HoverCard.Arrow>
    </HoverCard.Content>
  </HoverCard.Positioner>
</HoverCard.Root>
```

## Shortcuts

The `HoverCard` provides a shortcuts for common use cases.

### Arrow

The `HoverCard.Arrow` renders the `HoverCard.ArrowTip` component within in by default.

This works:

```tsx
<HoverCard.Arrow>
  <HoverCard.ArrowTip />
</HoverCard.Arrow>
```

This might be more concise, if you don't need to customize the arrow tip.

```jsx
<HoverCard.Arrow />
```

### Examples

### Controlled

Use the `open` and `onOpenChange` to control the visibility of the hover card.

```tsx
'use client'
import { Portal } from '@ark-ui/react/portal'
import { MapPinIcon } from 'lucide-react'
import { useState } from 'react'
import { HStack, Stack } from 'styled-system/jsx'
import { Avatar, HoverCard, Icon, Link, Text } from '@/components/ui'

export const App = () => {
  const [open, setOpen] = useState(false)

  return (
    <HoverCard.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <HoverCard.Trigger asChild>
        <Link href="https://twitter.com/grizzly_codes/" target="_blank">
          @grizzly_codes
        </Link>
      </HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content>
            <HoverCard.Arrow>
              <HoverCard.ArrowTip />
            </HoverCard.Arrow>
            <Stack gap="4" direction="row">
              <Avatar.Root size="lg">
                <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056?v=4" />
                <Avatar.Fallback name="Christian Busch" />
              </Avatar.Root>
              <Stack gap="3">
                <Stack gap="1">
                  <Text fontWeight="semibold">@grizzly_codes</Text>
                  <Text color="fg.muted">Principal Software Engineer working at Pyck.ai</Text>
                </Stack>
                <HStack gap="1" color="fg.subtle">
                  <Icon size="sm">
                    <MapPinIcon />
                  </Icon>
                  <Text textStyle="xs">Joined Oktober 2025</Text>
                </HStack>
              </Stack>
            </Stack>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  )
}

```

### Delays

Control the open and close delays using the `openDelay` and `closeDelay` props.

```tsx
import { Portal } from '@ark-ui/react/portal'
import { MapPinIcon } from 'lucide-react'
import { HStack, Stack } from 'styled-system/jsx'
import { Avatar, HoverCard, Icon, Link, Text } from '@/components/ui'

export const App = () => {
  return (
    <HoverCard.Root openDelay={1000} closeDelay={100}>
      <HoverCard.Trigger asChild>
        <Link href="https://twitter.com/grizzly_codes/" target="_blank">
          @grizzly_codes
        </Link>
      </HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content>
            <HoverCard.Arrow>
              <HoverCard.ArrowTip />
            </HoverCard.Arrow>
            <Stack gap="4" direction="row">
              <Avatar.Root size="lg">
                <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056?v=4" />
                <Avatar.Fallback name="Christian Busch" />
              </Avatar.Root>
              <Stack gap="3">
                <Stack gap="1">
                  <Text textStyle="sm" fontWeight="semibold">
                    @grizzly_codes
                  </Text>
                  <Text textStyle="sm" color="fg.muted">
                    Principal Software Engineer working at Pyck.ai
                  </Text>
                </Stack>
                <HStack gap="1" color="fg.subtle">
                  <Icon size="sm">
                    <MapPinIcon />
                  </Icon>
                  <Text textStyle="xs">Joined Oktober 2025</Text>
                </HStack>
              </Stack>
            </Stack>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  )
}

```

### Placement

Use the` positioning.placement` prop to change the position of the hover card.

```tsx
import { Portal } from '@ark-ui/react/portal'
import { MapPinIcon } from 'lucide-react'
import { HStack, Stack } from 'styled-system/jsx'
import { Avatar, HoverCard, Icon, Link, Text } from '@/components/ui'

export const App = () => {
  return (
    <HoverCard.Root positioning={{ placement: 'right' }}>
      <HoverCard.Trigger asChild>
        <Link href="https://twitter.com/grizzly_codes/" target="_blank">
          @grizzly_codes
        </Link>
      </HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content>
            <HoverCard.Arrow>
              <HoverCard.ArrowTip />
            </HoverCard.Arrow>
            <Stack gap="4" direction="row">
              <Avatar.Root size="lg">
                <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056?v=4" />
                <Avatar.Fallback name="Christian Busch" />
              </Avatar.Root>
              <Stack gap="3">
                <Stack gap="1">
                  <Text textStyle="sm" fontWeight="semibold">
                    @grizzly_codes
                  </Text>
                  <Text textStyle="sm" color="fg.muted">
                    Principal Software Engineer working at Pyck.ai
                  </Text>
                </Stack>
                <HStack gap="1" color="fg.subtle">
                  <Icon size="sm">
                    <MapPinIcon />
                  </Icon>
                  <Text textStyle="xs">Joined Oktober 2025</Text>
                </HStack>
              </Stack>
            </Stack>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  )
}

```

### Disabled

Use the `disabled` prop to prevent opening the hover card on interaction.

```tsx
import { Portal } from '@ark-ui/react/portal'
import { MapPinIcon } from 'lucide-react'
import { HStack, Stack } from 'styled-system/jsx'
import { Avatar, HoverCard, Icon, Link, Text } from '@/components/ui'

export const App = () => {
  return (
    <HoverCard.Root disabled>
      <HoverCard.Trigger asChild>
        <Link href="https://twitter.com/grizzly_codes/" target="_blank">
          @grizzly_codes
        </Link>
      </HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content>
            <HoverCard.Arrow>
              <HoverCard.ArrowTip />
            </HoverCard.Arrow>
            <Stack gap="4" direction="row">
              <Avatar.Root size="lg">
                <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056?v=4" />
                <Avatar.Fallback name="Christian Busch" />
              </Avatar.Root>
              <Stack gap="3">
                <Stack gap="1">
                  <Text textStyle="sm" fontWeight="semibold">
                    @grizzly_codes
                  </Text>
                  <Text textStyle="sm" color="fg.muted">
                    Principal Software Engineer working at Pyck.ai
                  </Text>
                </Stack>
                <HStack gap="1" color="fg.subtle">
                  <Icon size="sm">
                    <MapPinIcon />
                  </Icon>
                  <Text textStyle="xs">Joined Oktober 2025</Text>
                </HStack>
              </Stack>
            </Stack>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  )
}

```

### Dialog

To use the `HoverCard` within a `Dialog`, you need to avoid portalling the `HoverCard.Positioner` to the document's body.

```tsx
import { Portal } from '@ark-ui/react/portal'
import { MapPinIcon } from 'lucide-react'
import { HStack, Stack } from 'styled-system/jsx'
import { Avatar, Button, CloseButton, Dialog, HoverCard, Icon, Link, Text } from '@/components/ui'

export const App = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>Popover in Dialog</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <HoverCard.Root>
                <HoverCard.Trigger asChild>
                  <Link href="https://twitter.com/grizzly_codes/" target="_blank">
                    @grizzly_codes
                  </Link>
                </HoverCard.Trigger>
                <HoverCard.Positioner>
                  <HoverCard.Content>
                    <HoverCard.Arrow>
                      <HoverCard.ArrowTip />
                    </HoverCard.Arrow>
                    <Stack gap="4" direction="row">
                      <Avatar.Root size="lg">
                        <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056?v=4" />
                        <Avatar.Fallback name="Christian Busch" />
                      </Avatar.Root>
                      <Stack gap="3">
                        <Stack gap="1">
                          <Text textStyle="sm" fontWeight="semibold">
                            @grizzly_codes
                          </Text>
                          <Text textStyle="sm" color="fg.muted">
                            Principal Software Engineer working at Pyck.ai
                          </Text>
                        </Stack>
                        <HStack gap="1" color="fg.subtle">
                          <Icon size="sm">
                            <MapPinIcon />
                          </Icon>
                          <Text textStyle="xs">Joined Oktober 2025</Text>
                        </HStack>
                      </Stack>
                    </Stack>
                  </HoverCard.Content>
                </HoverCard.Positioner>
              </HoverCard.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Close</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

```

### Accessibility

HoverCard should be used solely for supplementary information that is not essential for understanding the context. 
It is inaccessible to screen readers and cannot be activated via keyboard, so avoid placing crucial content within it.

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `closeDelay` | 300 | `number`<br/>The duration from when the mouse leaves the trigger or content until the hover card closes. |
| `lazyMount` | false | `boolean`<br/>Whether to enable lazy mounting |
| `openDelay` | 600 | `number`<br/>The duration from when the mouse enters the trigger until the hover card opens. |
| `skipAnimationOnMount` | false | `boolean`<br/>Whether to allow the initial presence animation. |
| `unmountOnExit` | false | `boolean`<br/>Whether to unmount on exit. |
| `defaultOpen` | - | `boolean`<br/>The initial open state of the hover card when rendered.
Use when you don't need to control the open state of the hover card. |
| `disabled` | - | `boolean`<br/>Whether the hover card is disabled |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{ trigger: string; content: string; positioner: string; arrow: string }>`<br/>The ids of the elements in the popover. Useful for composition. |
| `immediate` | - | `boolean`<br/>Whether to synchronize the present change immediately or defer it to the next frame |
| `onExitComplete` | - | `VoidFunction`<br/>Function called when the animation ends in the closed state |
| `onFocusOutside` | - | `(event: FocusOutsideEvent) => void`<br/>Function called when the focus is moved outside the component |
| `onInteractOutside` | - | `(event: InteractOutsideEvent) => void`<br/>Function called when an interaction happens outside the component |
| `onOpenChange` | - | `(details: OpenChangeDetails) => void`<br/>Function called when the hover card opens or closes. |
| `onPointerDownOutside` | - | `(event: PointerDownOutsideEvent) => void`<br/>Function called when the pointer is pressed down outside the component |
| `open` | - | `boolean`<br/>The controlled open state of the hover card |
| `positioning` | - | `PositioningOptions`<br/>The user provided options used to position the popover content |
| `present` | - | `boolean`<br/>Whether the node is present (controlled by the user) |

# Menu

A dropdown component for displaying a list of actions or options.

```tsx
import { Button, Menu } from '@/components/ui'

export const App = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline">
          File
          <Menu.Indicator />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="new-file">New File</Menu.Item>
          <Menu.Item value="new-folder">New Folder</Menu.Item>
          <Menu.Item value="open">Open</Menu.Item>
          <Menu.Item value="save">Save</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

```

## Installation

Use the Park UI CLI to add the Menu component to your project:

```bash
npx @park-ui/cli add menu
```

## Usage

```tsx
import { Menu } from '@/components/ui'
```

```tsx
<Menu.Root>
  <Menu.Trigger />
  <Menu.Positioner>
    <Menu.Content>
      <Menu.Arrow />
      <Menu.Item />
      <Menu.ItemGroup>
        <Menu.Item />
      </Menu.ItemGroup>
      <Menu.Separator />
      <Menu.CheckboxItem>
        <Menu.ItemIndicator />
      </Menu.CheckboxItem>
      <Menu.RadioItemGroup>
        <Menu.RadioItem>
          <Menu.ItemIndicator />
        </Menu.RadioItem>
      </Menu.RadioItemGroup>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
```


## Examples

### Sizes

Use the `size` prop to adjust the size of the menu items.

```tsx
import { Wrap } from 'styled-system/jsx'
import { Button, Menu } from '@/components/ui'

export const App = () => {
  const sizes = ['xs', 'sm', 'md', 'lg'] as const

  return (
    <Wrap gap="4">
      {sizes.map((size) => (
        <Menu.Root key={size} size={size}>
          <Menu.Trigger asChild>
            <Button variant="outline" size={size}>
              File
              <Menu.Indicator />
            </Button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="new-file">New File</Menu.Item>
              <Menu.Item value="open-file">Open File</Menu.Item>
              <Menu.Separator />
              <Menu.Item value="save">Save</Menu.Item>
              <Menu.Item value="save-as">Save As</Menu.Item>
              <Menu.Item value="recent-files">Recent Files</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      ))}
    </Wrap>
  )
}

```

### Context Menu

Use the `Menu.ContextTrigger` component to create a context menu.

```tsx
import { Portal } from '@ark-ui/react/portal'
import { Center } from 'styled-system/jsx'
import { Menu } from '@/components/ui'

export const App = () => {
  return (
    <Menu.Root>
      <Menu.ContextTrigger width="full">
        <Center
          height="40"
          userSelect="none"
          borderWidth="2px"
          borderStyle="dashed"
          rounded="lg"
          padding="4"
        >
          Right click in explorer
        </Center>
      </Menu.ContextTrigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="new-file">New File</Menu.Item>
            <Menu.Item value="new-folder">New Folder</Menu.Item>
            <Menu.Item value="copy-path">Copy Path</Menu.Item>
            <Menu.Item value="reveal-explorer">Reveal in File Explorer</Menu.Item>
            <Menu.Item value="properties">Properties</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

```

### Group

Use the `Menu.ItemGroup` component to group related menu items.

```tsx
import { Portal } from '@ark-ui/react/portal'
import { Button, Menu } from '@/components/ui'

export const App = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline">View</Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Sort by</Menu.ItemGroupLabel>
              <Menu.Item value="name">Name</Menu.Item>
              <Menu.Item value="date-modified">Date Modified</Menu.Item>
              <Menu.Item value="size">Size</Menu.Item>
              <Menu.Item value="type">Type</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>View Options</Menu.ItemGroupLabel>
              <Menu.Item value="details">Details</Menu.Item>
              <Menu.Item value="icons">Large Icons</Menu.Item>
              <Menu.Item value="list">List</Menu.Item>
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

```

### Submenu

Here's an example of how to create a submenu.

```tsx
import { Portal } from '@ark-ui/react/portal'
import { ChevronRightIcon } from 'lucide-react'
import { Button, Menu } from '@/components/ui'

export const App = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" colorPalette="gray">
          Tools
          <Menu.Indicator />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="find-files">Find Files</Menu.Item>
            <Menu.Item value="search-replace">Search & Replace</Menu.Item>
            <Menu.Item value="compare-files">Compare Files</Menu.Item>
            <Menu.Root>
              <Menu.TriggerItem justifyContent="space-between">
                Git
                <ChevronRightIcon />
              </Menu.TriggerItem>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="git-status">Status</Menu.Item>
                    <Menu.Item value="git-commit">Commit Changes</Menu.Item>
                    <Menu.Item value="git-history">View History</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            <Menu.Item value="terminal">Open Terminal</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

```

### Radio Group

Here's an example of how to create a menu with radio items.

<ComponentExample name="radioGroup" />

### Checkbox Items

Here's an example of how to create a menu with checkbox items.

```tsx
'use client'
import { useCheckboxGroup } from '@ark-ui/react/checkbox'
import { Button, Menu } from '@/components/ui'

export const App = () => {
  const items = [
    { title: 'Enable Notifications', value: 'notifications' },
    { title: 'Dark Mode', value: 'dark-mode' },
    { title: 'Show Tooltips', value: 'tooltips' },
  ]

  const group = useCheckboxGroup({ defaultValue: ['notifications'] })

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="surface">
          Settings
          <Menu.Indicator />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          {items.map(({ title, value }) => (
            <Menu.CheckboxItem
              key={value}
              value={value}
              checked={group.isChecked(value)}
              onCheckedChange={() => group.toggleValue(value)}
            >
              {title}
              <Menu.ItemIndicator />
            </Menu.CheckboxItem>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

```

### Avatar

Here's an example that composes the `Menu` with the `Avatar` component to display a menu underneath an avatar.

<ComponentExample name="withAvatar" />

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `size` | 'md' | `'xs' | 'sm' | 'md' | 'lg' | 'xl'` |
| `closeOnSelect` | true | `boolean`<br/>Whether to close the menu when an option is selected |
| `composite` | true | `boolean`<br/>Whether the menu is a composed with other composite widgets like a combobox or tabs |
| `lazyMount` | false | `boolean`<br/>Whether to enable lazy mounting |
| `loopFocus` | false | `boolean`<br/>Whether to loop the keyboard navigation. |
| `skipAnimationOnMount` | false | `boolean`<br/>Whether to allow the initial presence animation. |
| `typeahead` | true | `boolean`<br/>Whether the pressing printable characters should trigger typeahead navigation |
| `unmountOnExit` | false | `boolean`<br/>Whether to unmount on exit. |
| `anchorPoint` | - | `Point`<br/>The positioning point for the menu. Can be set by the context menu trigger or the button trigger. |
| `aria-label` | - | `string`<br/>The accessibility label for the menu |
| `defaultHighlightedValue` | - | `string`<br/>The initial highlighted value of the menu item when rendered.
Use when you don't need to control the highlighted value of the menu item. |
| `defaultOpen` | - | `boolean`<br/>The initial open state of the menu when rendered.
Use when you don't need to control the open state of the menu. |
| `highlightedValue` | - | `string`<br/>The controlled highlighted value of the menu item. |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{
  trigger: string
  contextTrigger: string
  content: string
  groupLabel: (id: string) => string
  group: (id: string) => string
  positioner: string
  arrow: string
}>`<br/>The ids of the elements in the menu. Useful for composition. |
| `immediate` | - | `boolean`<br/>Whether to synchronize the present change immediately or defer it to the next frame |
| `navigate` | - | `(details: NavigateDetails) => void`<br/>Function to navigate to the selected item if it's an anchor element |
| `onEscapeKeyDown` | - | `(event: KeyboardEvent) => void`<br/>Function called when the escape key is pressed |
| `onExitComplete` | - | `VoidFunction`<br/>Function called when the animation ends in the closed state |
| `onFocusOutside` | - | `(event: FocusOutsideEvent) => void`<br/>Function called when the focus is moved outside the component |
| `onHighlightChange` | - | `(details: HighlightChangeDetails) => void`<br/>Function called when the highlighted menu item changes. |
| `onInteractOutside` | - | `(event: InteractOutsideEvent) => void`<br/>Function called when an interaction happens outside the component |
| `onOpenChange` | - | `(details: OpenChangeDetails) => void`<br/>Function called when the menu opens or closes |
| `onPointerDownOutside` | - | `(event: PointerDownOutsideEvent) => void`<br/>Function called when the pointer is pressed down outside the component |
| `onRequestDismiss` | - | `(event: LayerDismissEvent) => void`<br/>Function called when this layer is closed due to a parent layer being closed |
| `onSelect` | - | `(details: SelectionDetails) => void`<br/>Function called when a menu item is selected. |
| `open` | - | `boolean`<br/>The controlled open state of the menu |
| `positioning` | - | `PositioningOptions`<br/>The options used to dynamically position the menu |
| `present` | - | `boolean`<br/>Whether the node is present (controlled by the user) |

### Item

| Prop | Default | Type |
| --- | --- | --- |
| `value`* | - | `string`<br/>The unique value of the menu item option. |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `closeOnSelect` | - | `boolean`<br/>Whether the menu should be closed when the option is selected. |
| `disabled` | - | `boolean`<br/>Whether the menu item is disabled |
| `onSelect` | - | `VoidFunction`<br/>The function to call when the item is selected |
| `valueText` | - | `string`<br/>The textual value of the option. Used in typeahead navigation of the menu.
If not provided, the text content of the menu item will be used. |

### RadioItemGroup

| Prop | Default | Type |
| --- | --- | --- |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `onValueChange` | - | `(e: ValueChangeDetails) => void` |
| `value` | - | `string` |

### RadioItem

| Prop | Default | Type |
| --- | --- | --- |
| `value`* | - | `string`<br/>The value of the option |
| `asChild` | - | `boolean`<br/>Use the provided child element as the default rendered element, combining their props and behavior. |
| `closeOnSelect` | - | `boolean`<br/>Whether the menu should be closed when the option is selected. |
| `disabled` | - | `boolean`<br/>Whether the menu item is disabled |
| `valueText` | - | `string`<br/>The textual value of the option. Used in typeahead navigation of the menu.
If not provided, the text content of the menu item will be used. |

# Tooltip

A component for displaying contextual information on hover or focus.

```tsx
import { Button, Tooltip } from '@/components/ui'

export const App = () => {
  return (
    <Tooltip content="This is the tooltip content">
      <Button variant="outline" size="sm">
        Hover me
      </Button>
    </Tooltip>
  )
}

```

## Installation

Use the Park UI CLI to add the Tooltip component to your project:

```bash
npx @park-ui/cli add tooltip
```

## Usage

```tsx
import { Tooltip } from '@/components/ui'
```

```tsx
<Tooltip content="This is the tooltip content">
  <button>Hover me</button>
</Tooltip>
```

## Examples

### Arrow

Use the `showArrow` prop to show an arrow on the tooltip.

```tsx
import { Button, Tooltip } from '@/components/ui'

export const App = () => {
  return (
    <Tooltip showArrow content="This is the tooltip content">
      <Button variant="outline" size="sm">
        Hover me
      </Button>
    </Tooltip>
  )
}

```

### Placement

Use the `positioning.placement` prop to change the position of the tooltip.

```tsx
import { Button, Tooltip } from '@/components/ui'

export const App = () => {
  return (
    <Tooltip content="This is the tooltip content" positioning={{ placement: 'right-end' }}>
      <Button variant="outline" size="sm">
        Hover me
      </Button>
    </Tooltip>
  )
}

```

### Offset

Use the `positioning.offset` prop to change the offset of the tooltip.

```tsx
import { Button, Tooltip } from '@/components/ui'

export const App = () => {
  return (
    <Tooltip
      content="This is the tooltip content"
      positioning={{ offset: { mainAxis: 24, crossAxis: 24 } }}
    >
      <Button variant="outline" size="sm">
        Hover me
      </Button>
    </Tooltip>
  )
}

```

### Delay

Use the `openDelay` and `closeDelay` prop to change the delay of the tooltip.

```tsx
import { Button, Tooltip } from '@/components/ui'

export const App = () => {
  return (
    <Tooltip content="This is the tooltip content" closeDelay={0} openDelay={0}>
      <Button variant="outline" size="sm">
        Delay (open: 0ms, close: 0ms)
      </Button>
    </Tooltip>
  )
}

```

### Custom Background

Use the `--tooltip-bg` CSS variable to change the background color of the tooltip.

```tsx
import { Button, Tooltip } from '@/components/ui'

export const App = () => {
  return (
    <Tooltip
      showArrow
      content="This is the tooltip content"
      contentProps={{
        style: {
          ['--tooltip-bg' as string]: 'tomato',
        },
      }}
    >
      <Button variant="outline" size="sm">
        Hover me
      </Button>
    </Tooltip>
  )
}

```

### Controlled

Use the `open` and `onOpenChange` prop to control the visibility of the tooltip.

```tsx
'use client'
import { useState } from 'react'
import { Button, Tooltip } from '@/components/ui'

export const App = () => {
  const [open, setOpen] = useState(false)
  return (
    <Tooltip
      content="This is the tooltip content"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Button variant="outline" size="sm">
        {open ? 'Hide' : 'Show'} Tooltip
      </Button>
    </Tooltip>
  )
}

```

### Interactive

Use the `interactive` prop to keep the tooltip open when interacting with its content.

```tsx
import { Button, Tooltip } from '@/components/ui'

export const App = () => {
  return (
    <Tooltip content="This is the tooltip content" interactive>
      <Button variant="outline" size="sm">
        Hover me
      </Button>
    </Tooltip>
  )
}

```

### Disabled

Use the `disabled` prop to disable the tooltip. When disabled, the tooltip will not be shown.

```tsx
import { Button, Tooltip } from '@/components/ui'

export const App = () => {
  return (
    <Tooltip content="This is the tooltip content" disabled>
      <Button variant="outline" size="sm">
        Hover me
      </Button>
    </Tooltip>
  )
}

```

### With Avatar

Here's an example of how to use the `Tooltip` component with an `Avatar` component.

```tsx
import { useId } from 'react'
import { Avatar, Tooltip } from '@/components/ui'

export const App = () => {
  const id = useId()

  return (
    <Tooltip ids={{ trigger: id }} content="Christian Busch is online">
      <Avatar.Root ids={{ root: id }} size="lg">
        <Avatar.Image src="https://shorturl.at/gaV8r" />
        <Avatar.Fallback name="Christian Busch" />
      </Avatar.Root>
    </Tooltip>
  )
}

```

### With Switch

Here's an example of how to wrap `Tooltip` around a `Switch` component.

```tsx
import { useId } from 'react'
import { Switch, Tooltip } from '@/components/ui'

export const App = () => {
  const id = useId()
  return (
    <Tooltip ids={{ trigger: id }} content="This is a tooltip">
      <Switch.Root ids={{ root: id }}>
        <Switch.HiddenInput />
        <Switch.Control />
        <Switch.Label>Switch with tooltip</Switch.Label>
      </Switch.Root>
    </Tooltip>
  )
}

```

## Props

### Root

| Prop | Default | Type |
| --- | --- | --- |
| `closeDelay` | 150 | `number`<br/>The close delay of the tooltip. |
| `closeOnClick` | true | `boolean`<br/>Whether the tooltip should close on click |
| `closeOnEscape` | true | `boolean`<br/>Whether to close the tooltip when the Escape key is pressed. |
| `closeOnPointerDown` | true | `boolean`<br/>Whether to close the tooltip on pointerdown. |
| `closeOnScroll` | true | `boolean`<br/>Whether the tooltip should close on scroll |
| `interactive` | false | `boolean`<br/>Whether the tooltip's content is interactive.
In this mode, the tooltip will remain open when user hovers over the content. |
| `lazyMount` | false | `boolean`<br/>Whether to enable lazy mounting |
| `openDelay` | 400 | `number`<br/>The open delay of the tooltip. |
| `skipAnimationOnMount` | false | `boolean`<br/>Whether to allow the initial presence animation. |
| `unmountOnExit` | false | `boolean`<br/>Whether to unmount on exit. |
| `aria-label` | - | `string`<br/>Custom label for the tooltip. |
| `defaultOpen` | - | `boolean`<br/>The initial open state of the tooltip when rendered.
Use when you don't need to control the open state of the tooltip. |
| `disabled` | - | `boolean`<br/>Whether the tooltip is disabled |
| `id` | - | `string`<br/>The unique identifier of the machine. |
| `ids` | - | `Partial<{ trigger: string; content: string; arrow: string; positioner: string }>`<br/>The ids of the elements in the tooltip. Useful for composition. |
| `immediate` | - | `boolean`<br/>Whether to synchronize the present change immediately or defer it to the next frame |
| `onExitComplete` | - | `VoidFunction`<br/>Function called when the animation ends in the closed state |
| `onOpenChange` | - | `(details: OpenChangeDetails) => void`<br/>Function called when the tooltip is opened. |
| `open` | - | `boolean`<br/>The controlled open state of the tooltip |
| `positioning` | - | `PositioningOptions`<br/>The user provided options used to position the popover content |
| `present` | - | `boolean`<br/>Whether the node is present (controlled by the user) |

