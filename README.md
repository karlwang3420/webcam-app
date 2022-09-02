# Webcam App

### <strong>Step 1.</strong> I started from looking at this tutorial on youtube

https://www.youtube.com/watch?v=nhX9EUGIZ6o

### <strong>Step 2.</strong> Then I learned how to save pictures with this discussion form

https://stackoverflow.com/questions/13760805/how-to-take-a-snapshot-of-html5-javascript-based-video-player

### <strong>Step 3.</strong> And the assignment requirements seems to be meet. However, the snapshots are a bit blurry and I don't know how to fix it.

---

### <strong>Step 4.</strong> Then I started thinking about adding functionality to this program. My first idea was <strong>dark mode</strong>. So I added it on Wednesday.

### <strong>Step 5.</strong> I then wanted to add a <strong>filter</strong> for the video feed, so I started search for ideas online. However, I wasn't successful for the first 2 days until I found this video:

<strong>How To Build A Photo Editor With React And CSS Filters</strong>  
https://www.youtube.com/watch?v=J243ncoInNE

And that made me think I should look more into the canvas 2D context, and then I found it also has the simple filters

Then I found this post  
https://stackoverflow.com/questions/32104975/html5-mirroring-webcam-canvas  
Which includes a way to continuously update the canvas, and also a way to flip the canvas

### <strong>Step 6.</strong> From here, I figured out how to save canvas Image as ImageData, and then show it else where. I was also pleasantly surprised that the image quality is much better.

- One last problem, the text is also blurred by the filter, and I want to show clear text with blurred image.

### <strong>Step 7.</strong> I solved it by

1. blurring the image and saving it first.
2. Remove the filter, then putting the image back.
3. Then write the text onto the canvas.
