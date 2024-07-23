import podman
from podman import PodmanClient
import logging

# Setup logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def run_container(client, image, command):
    try:
        logger.debug(f"Creating container with image: {image} and command: {command}")
        container = client.containers.create(
            image=image,
            command=command,
            remove=True,
            detach=False
        )
        logger.debug("Starting container...")
        container.start()
        logs = container.logs(stdout=True, stderr=True, stream=False)
        return b''.join(logs).decode('utf-8').strip()
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        return str(e)

if __name__ == "__main__":
    IMAGE_NAME = "nikto-img"  # Replace with your preinstalled image name
    COMMAND = ["nikto", "-V"]  # Replace with the command you want to run

    # Connect to Podman service
    logger.debug("Connecting to Podman service...")
    try:
        client = PodmanClient(base_url="unix:///run/podman/podman.sock")
    except Exception as e:
        logger.error(f"Failed to connect to Podman service: {e}")
        exit(1)

    # Run container with specified command
    logger.debug(f"Running command in container using image {IMAGE_NAME}...")
    output = run_container(client, IMAGE_NAME, COMMAND)
    print(output)