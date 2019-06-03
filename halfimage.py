#imports
from PIL import Image
from scipy import ndimage
from scipy import misc
from matplotlib import pyplot as mp
import matplotlib.pyplot as plt
import numpy as np

def main ():

	#transparency ('tree.jpg')

# function : transparency
# purpose: make the right side of the image transparent
# input: the image to be altered
# output: the image with the right side transparent

#need to figure out how to make this its own method
#def transparency ('tree.jpg'): 

	#read in the image, convert to RGBA values, pixels as an array
	pixels = np.array((Image.open('turtle.jpg')).convert('RGBA'))
    
    #dimensions of the image
    #shape method results in two values -> [0] = # of rows, [1] = # of columns
	height = pixels.shape[0]
	width = pixels.shape[1]

	#divide width by two & then make it right half
	halfwidth = width - (width / 2)

	#image as an array
	#for each pixel in the height
	for i in range(height) :
		#for each pixel in the right (width) half of the image
		for j in range(halfwidth, width):
			#pixel_values is an array with height (index 0), width (index 1), and RGBA values (index 2)
			#index 2: [0] = R, [1] = G, [2] = B, [3] = A (opacity)
			#opacity = 0 will make that pixel transparent
			pixels[i][j][3] = 0;

	#reassign the pixels to the image
	#show and save the altered image
	plt.imshow(pixels)
	plt.imsave('turtle2.jpg', pixels)
	plt.show()

if __name__ == '__main__':
	main ()