## camera

- **fov** : The vertical field of view. Default is 50.
  - the angle that captured by the lens. [visualization](https://observablehq.com/@grantcuster/understanding-scale-and-the-three-js-perspective-camera)
- **aspect** : The aspect ratio. Default is 1.
- **near** : The camera's near plane. Default is 0.1.
- **far** : The camera's far plane. Default is 2000.

- if set too small number for near and too big number for far, so it covers everything, it may cause `Z-fighting`

- the **far** number is the farthest distance that can be seen; and the **near** number is the closest distance that can be seen with camera. so if we set the position of camera for example `5`, and set the far to `7` and near to `1`, it means camera positioned at `5`, and can see distance between `1` and `7`:

```
      _____________________________
     |                             |
    `N`                 `C`       `F`
|----|----|----|----|----|----|----|----|
0    1    2    3    4    5    6    7    8
```
- so if we set the **far** number less that camera position, the item is not visible:
```
      _________
     |         |
    `N`       `F`       `C`       
|----|----|----|----|----|----|----|----|
0    1    2    3    4    5    6    7    8
```
- about **near** number, we should notice that when we set the **near** and position of the camera the same number, the camera actually is **inside** the item! so we have to minus at least half of the item geometry that is in the same axis of the camera, so we can see it. for example if the camera positioned at z = 5, and item is (1,1,1); the **near** value must be <4.5 so we can see it. ( 1 / 2 = 0.5, 5 - 0.5 = 4.5)
- with the same logic, the **far** number must be at least >=4.5