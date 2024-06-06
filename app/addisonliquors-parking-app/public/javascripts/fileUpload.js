document.addEventListener('DOMContentLoaded', function() {
    // Register FilePond plugins
    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode
    );

    // Set FilePond options
    FilePond.setOptions({
        stylePanelAspectRatio: 150 / 100,
        imageResizeTargetWidth: 100,
        imageResizeTargetHeight: 150
    });

    // Initialize FilePond
    const inputElement = document.querySelector('input[name="cover"]');
    if (inputElement) {
        FilePond.create(inputElement);
    }
});



// FilePond.registerPlugin(
//     FilePondPluginImagePreview,
//     FilePondPluginImageResize,
//     FilePondPluginFileEncode
// ) // Register FilePond Plugins

// FilePond.setOptions({
//     stylePanelAspectRatio: 150 / 100,
//     imageResizeTargetWidth: 100,
//     imageResizeTargetHeight: 150
// })



// FilePond.parse(document.body);
