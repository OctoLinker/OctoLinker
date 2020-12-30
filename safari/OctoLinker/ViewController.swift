import Cocoa
import SafariServices.SFSafariApplication
import SafariServices.SFSafariExtensionManager

let appName = "OctoLinker"
let extensionBundleIdentifier = "com.stefanbuck.OctoLinker.Extension"

final class ViewController: NSViewController {
    @IBOutlet var appNameLabel: NSTextField!

    override func viewDidLoad() {
        super.viewDidLoad()

        appNameLabel.stringValue = appName

        SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: extensionBundleIdentifier) { state, error in
            guard
                let state = state,
                error == nil
            else {
                // Insert code to inform the user that something went wrong.
                return
            }

            DispatchQueue.main.async { [self] in
                if state.isEnabled {
                    appNameLabel.stringValue = "\(appName)'s extension is currently on."
                } else {
                    appNameLabel.stringValue = "\(appName)'s extension is currently off. You can turn it on in Safari Extensions preferences."
                }
            }
        }
    }

    @IBAction
    func openSafariExtensionPreferences(_ sender: AnyObject?) {
        SFSafariApplication.showPreferencesForExtension(withIdentifier: extensionBundleIdentifier) { error in
            guard error == nil else {
                // Insert code to inform the user that something went wrong.
                return
            }

            DispatchQueue.main.async {
                NSApp.terminate(nil)
            }
        }
    }

}
