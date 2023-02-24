cask "chatgpt" do
  version "0.11.0"
  arch = Hardware::CPU.arch.to_s
  sha256s = {
    "x86_64" => "5f8013bee34daa53be8612b751955f745e7af9ef85b3541eba304b45176b6d8a",
    "aarch64" => "a5d914277d16827c5e3c641abd80c7978f78b8ccf36bf08661e1bc06efc6224e"
  }
  if arch == "arm64" then arch = "aarch64" end
  url "https://github.com/lencx/ChatGPT/releases/download/v#{version}/ChatGPT_#{version}_macos_#{arch}.dmg"
  sha256 sha256s[arch]

  name "ChatGPT"
  desc "Desktop wrapper for OpenAI ChatGPT"
  homepage "https://github.com/boynTeam/Phind#readme"

  app "ChatGPT.app"

  uninstall quit: "com.boynn.phind"

  zap trash: [
    "~/.phind",
    "~/Library/Caches/com.boynn.phind",
    "~/Library/HTTPStorages/com.boynn.phind.binarycookies",
    "~/Library/Preferences/com.boynn.phind.plist",
    "~/Library/Saved Application State/com.boynn.phind.savedState",
    "~/Library/WebKit/com.boynn.phind",
  ]
end
