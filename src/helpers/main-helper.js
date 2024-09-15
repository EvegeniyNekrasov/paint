export function addListener(elementId, event, handler) {
	const element = document.getElementById(elementId);
	if (element) {
		element.addEventListener(event, handler);
	}
}
