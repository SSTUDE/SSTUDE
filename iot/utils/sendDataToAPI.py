import request

url = "/my/url/path"

def postImages(image, access_token):
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'image/jpeg'
    }
	response = requests.post(url, headers=headers, data=image_data)

    return response
